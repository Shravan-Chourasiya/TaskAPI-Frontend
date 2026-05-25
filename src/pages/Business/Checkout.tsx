/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { apiInstance } from '@/lib/axiosInstance';
import { usePlanStore } from '@/lib/planStore';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
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

  const planDetails: PlanDetails = selectedPlan || {
    name: 'Basic',
    price: 5,
    features: [
      'Up to 10,000 MAU',
      'Passkey Support',
      'OAuth Providers',
      'Email Support',
      'Standard Infrastructure',
      'Basic Analytics'
    ]
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const { isAuthenticated } = useAuth();

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue with payment');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (planDetails.name === 'Free ') {
        const subscriptionPlanDetails = { planName: planDetails.name.trim(), autoRenewStatus: false, duration: 12, price: 0 };

        await apiInstance.post('/api/v1/subscription/buy-plan', { subscriptionPlanDetails });
        toast.success('Successfully subscribed to Free plan!');
        navigate('/payment-success', {
          state: {
            plan: planDetails.name,
            amount: planDetails.price
          }
        });
        setLoading(false);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setLoading(false);
        return;
      }

      const subscriptionPlanDetails = {
        amount: planDetails.price * 100,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        plan: planDetails
      };

      const { data } = await apiInstance.post('/api/v1/subscription/buy-plan', { subscriptionPlanDetails });
      if (!data) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'TaskAPI',
        description: `${planDetails.name} Plan Subscription`,
        order_id: data.id,
        handler: async function (response: any) {
          try {
            await apiInstance.post('/api/v1/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: planDetails.name
            });

            toast.success('Payment successful! Subscription activated.');
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
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#6366f1'
        },
        modal: {
          ondismiss: function () {
            toast.warning('Payment cancelled');
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error((error as any).response?.data?.message || 'Failed to initiate payment. Please try again.');
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
                <span className="text-on-surface font-bold">Monthly</span>
              </div>
              <div className="h-px bg-outline-variant my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-on-surface">Total</span>
                <span className="text-2xl font-black text-primary">${planDetails.price}</span>
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
                {loading ? 'Processing...' : `Pay $${planDetails.price}`}
              </Button>

              <p className="text-xs text-secondary text-center">
                By proceeding, you agree to our Terms of Service and Privacy Policy.
                Your subscription will auto-renew monthly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
