import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { apiInstance } from '@/lib/axiosInstance';
import { usePlanStore } from '@/lib/planStore';
import { toast } from 'sonner';
import { config } from '@/utils/config';
import { RAZORPAY_SCRIPT_URL, APP_NAME, PRIMARY_COLOR, DEFAULT_PLAN, API_ENDPOINTS } from '@/constants';

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayError {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

declare global {
  interface Window {
    Razorpay: {
      new (options: unknown): {
        open: () => void;
        on: (event: string, handler: (response: RazorpayError) => void) => void;
      };
    };
  }
}

interface PlanDetails {
  name: string;
  price: number;
  features: string[];
}

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const selectedPlan = usePlanStore((state) => state.selectedPlan);
  const { isAuthenticated, user } = useAuth();
  
  if (!user || !isAuthenticated) {
    toast.error('User not authenticated. Please login to continue.');
    navigate('/login');
    return null;
  }
  
  const name = `${user.profile?.firstName} ${user.profile?.lastName}`;
  const authUser = { ...user, name: name || user.username };

  const planDetails: PlanDetails = selectedPlan || DEFAULT_PLAN;

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = RAZORPAY_SCRIPT_URL;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue with payment');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const subscriptionPlanDetails = {
        planName: planDetails.name.trim() as 'Free' | 'Basic' | 'Pro',
        price: planDetails.price,
        duration: 12,
        autoRenewStatus: planDetails.name === 'Free' ? false : true
      };

      // Handle Free Plan
      if (planDetails.name === 'Free') {
        const response = await apiInstance.post(API_ENDPOINTS.SUBSCRIPTION.BUY, {
          subscriptionPlanDetails
        });
        
        toast.success(response.data?.message || 'Successfully subscribed to Free plan!');
        usePlanStore.getState().clearSelectedPlan();
        navigate('/payment-success', {
          state: {
            plan: planDetails.name,
            amount: 0
          }
        });
        setLoading(false);
        return;
      }

      // Load Razorpay script for paid plans
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setLoading(false);
        return;
      }

      // Step 1: Buy subscription and get Razorpay order
      const buyResponse = await apiInstance.post(API_ENDPOINTS.SUBSCRIPTION.BUY, {
        subscriptionPlanDetails
      });

      if (!buyResponse.data?.data?.razorpayOrder) {
        throw new Error('Failed to create order');
      }

      const { razorpayOrder } = buyResponse.data.data;

      // Step 2: Open Razorpay Payment UI
      const options = {
        key: config.RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: APP_NAME,
        description: `${planDetails.name} Plan Subscription`,
        handler: async function (response: RazorpayResponse) {
          try {
            // Step 3: Verify Payment
            const verifyResponse = await apiInstance.post(API_ENDPOINTS.SUBSCRIPTION.VERIFY_PAYMENT, {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (!verifyResponse.data?.success) {
              throw new Error('Payment verification failed');
            }

            toast.success(verifyResponse.data.message || 'Payment successful! Subscription activated.');
            usePlanStore.getState().clearSelectedPlan();

            navigate('/payment-success', {
              state: {
                plan: planDetails.name,
                amount: planDetails.price
              }
            });
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: authUser.name || '',
          email: authUser.email || '',
          contact: authUser.phone || ''
        },
        theme: {
          color: PRIMARY_COLOR
        },
        modal: {
          ondismiss: function () {
            toast.warning('Payment cancelled');
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: RazorpayError) {
        console.error('Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error && 'response' in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Failed to initiate payment. Please try again.';
      toast.error(errorMessage || 'Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate('/pricing')}
          className="flex items-center gap-2 text-shadow-primary hover:text-shadow-on-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Pricing
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-surface-container-low rounded-3xl p-8 h-fit">
            <h2 className="text-2xl font-black text-on-surface mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-secondary font-medium">Plan</span>
                <span className="text-on-surface font-bold">{planDetails.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary font-medium">Billing Cycle</span>
                <span className="text-on-surface font-bold">12 Months</span>
              </div>
              <div className="h-px bg-outline-variant my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-on-surface">Total</span>
                <span className="text-2xl font-black text-primary">₹{planDetails.price}</span>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-4 space-y-2">
              <h3 className="font-bold text-on-surface mb-3">Included Features:</h3>
              {planDetails.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-on-surface">Payment Details</h2>
                <p className="text-sm text-secondary">Secure checkout powered by Razorpay</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface-container rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>256-bit SSL encrypted payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>PCI DSS compliant</span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : planDetails.price === 0 ? 'Activate Free Plan' : `Pay ₹${planDetails.price}`}
              </Button>

              <p className="text-xs text-secondary text-center">
                By proceeding, you agree to our Terms of Service and Privacy Policy.
                {planDetails.price > 0 && ' Your subscription will be valid for 12 months.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
