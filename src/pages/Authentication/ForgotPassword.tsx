import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Terminal, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OTPVerification from '@/components/auth/OTPVerification';
import { type AxiosError } from 'axios';
import { config } from '@/utils/config';
import { apiInstance } from '@/lib/axiosInstance';

type Step = 'email' | 'otp' | 'reset';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [id, setID] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(config.OTP_RESEND_COOLDOWN_SECONDS);
  const navigate = useNavigate();

  useEffect(() => {
    if (step !== 'otp' || otpSuccess || resendCooldown === 0) return;

    const intervalId = window.setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [step, otpSuccess, resendCooldown]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiInstance.post("/api/v1/auth/forgot-password/init", { email });
      if (!response.data.data) {
        setError(response.data.message || 'Failed to send reset code. Please try again.');
        setLoading(false);
        return;
      }
      setEmail(response.data.data.email);
      setStep('otp');
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedOtp = otp.replace(/\D/g, '');
    if (normalizedOtp.length !== 6) {
      setError('Please enter the full 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiInstance.post(`${config.SERVER_URL}/api/v1/auth/verify?purpose=fr-pa`, { otp, email });
      if (!response.data.data) {
        setError(response.data.message || 'Invalid or expired code. Please try again.');
        setLoading(false);
        return;
      }
      setID(response.data.data.userId);
      setEmail(response.data.data.userEmail);
      setOtpSuccess(true);
      setTimeout(() => {
        setOtpSuccess(false);
        setStep('reset');
      }, 1000);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || 'Invalid or expired code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiInstance.post(`${config.SERVER_URL}/api/v1/auth/forgot-password/update`, {
        userId: id,
        userEmail: email,
        newPassword
      });

      if (!response.data.success) {
        setError(response.data.message || 'Failed to reset password. Please try again.');
        setLoading(false);
        return;
      }
      navigate('/login');
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setOtp('');
    try {
      await apiInstance.post(`${config.SERVER_URL}/api/v1/auth/resend-otp`, { email });
      setResendCooldown(config.OTP_RESEND_COOLDOWN_SECONDS);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const handleRevert = () => {
    setStep('email');
    setOtp('');
    setError('');
    setOtpSuccess(false);
  };

  if (step === 'otp') {
    return (
      <OTPVerification
        otp={otp}
        email={email}
        loading={loading}
        error={error}
        otpSuccess={otpSuccess}
        resendCooldown={resendCooldown}
        otpDailyLimit={config.OTP_DAILY_LIMIT}
        purpose="password-reset"
        onOtpSubmit={handleOtpSubmit}
        onResendOtp={handleResendOtp}
        onRevert={handleRevert}
        onOtpChange={setOtp}
      />
    );
  }

  if (step === 'reset') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <Terminal className="w-3 h-3" />
              Reset Password
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 -tracking-[0.02em]">
              Create New Password
            </h1>
            <p className="text-secondary text-lg">
              Enter your new password below
            </p>
          </div>

          <div className="bg-surface-container-low p-8 rounded-3xl shadow-ambient">
            <form onSubmit={handlePasswordReset} className="space-y-6">
              {error && (
                <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-bold text-on-surface">
                  Enter New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-on-surface">
                  Confirm Your New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                    placeholder="Re-enter your password"
                    required
                  />
                </div>
                <p className="text-xs text-secondary">
                  Min 8 characters with uppercase, lowercase, number & special character
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-secondary text-sm hover:text-on-surface transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold tracking-widest uppercase mb-6">
            <Terminal className="w-3 h-3" />
            Password Recovery
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 -tracking-[0.02em]">
            Forgot Password?
          </h1>
          <p className="text-secondary text-lg">
            Enter your email to receive a reset code
          </p>
        </div>

        <div className="bg-surface-container-low p-8 rounded-3xl shadow-ambient">
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            {error && (
              <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-on-surface">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? 'Sending Code...' : 'Send Reset Code'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary text-sm">
              Remember your password?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-secondary text-sm hover:text-on-surface transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
