import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, amount } = location.state || {};

  useEffect(() => {
    // Redirect if no payment data
    if (!plan || !amount) {
      navigate('/pricing');
    }
  }, [plan, amount, navigate]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-surface-container-low rounded-3xl p-12 text-center space-y-6">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-on-surface">Payment Successful!</h1>
            <p className="text-lg text-secondary">
              Your subscription to the <span className="font-bold text-primary">{plan} Plan</span> is now active.
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-surface-container rounded-2xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Plan</span>
              <span className="font-bold text-on-surface">{plan}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Amount Paid</span>
              <span className="font-bold text-on-surface">${amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Billing Cycle</span>
              <span className="font-bold text-on-surface">Monthly</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Next Billing Date</span>
              <span className="font-bold text-on-surface">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
            <p className="text-sm text-secondary">
              A confirmation email with your invoice has been sent to your registered email address.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/dashboard"
              className="flex-1 bg-primary text-on-primary py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-surface-container-high text-on-surface py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
          </div>

          {/* Support Link */}
          <p className="text-sm text-secondary pt-4">
            Need help? <Link to="/contact" className="text-primary font-bold hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
