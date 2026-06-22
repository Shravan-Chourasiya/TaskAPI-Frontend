import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '@/utils/config';
import RegisterForm from '../../components/auth/RegisterForm';
import OTPVerification from '../../components/auth/OTPVerification';
import { OTP_LENGTH, API_ENDPOINTS } from '../../constants';
import { toast } from 'sonner';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(config.OTP_RESEND_COOLDOWN_SECONDS);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOtpSent || otpSuccess || resendCooldown === 0) return;

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
  }, [isOtpSent, otpSuccess, resendCooldown]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${config.SERVER_URL}${API_ENDPOINTS.AUTH.REGISTER}`,
        { username, email, password },
      );
      if (response.status === 201) {
        toast.success('Registration successful. Please check your email for verification.');
      }
      setOtp('');
      setOtpSuccess(false);
      setIsOtpSent(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Check if user is already registered but not verified
      const isRegisteredButNotVerified = err.response?.data?.isRegisteredButNotVerified || err.response?.data?.data?.isRegisteredButNotVerified;

      if (isRegisteredButNotVerified) {
        setIsOtpSent(true);
      }
      if (err.response?.data?.message.includes("Zod Validation failed")) {

        setError("Username Or Password does not meet the requirements. Please check and try again.");
        toast.error("Username Or Password does not meet the requirements. Please check and try again.");
      }
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedOtp = otp.replace(/\D/g, '');
    if (normalizedOtp.length !== OTP_LENGTH) {
      setError('Please enter the full 6-digit OTP.');
      toast.error('Please enter the full 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post(
        `${config.SERVER_URL}${API_ENDPOINTS.AUTH.VERIFY}?purpose=ve-em-or`,
        { otp, email },
      );
      setOtpSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Account verification failed. Please try again.');
      toast.error(err.response?.data?.message || 'Account verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevert = () => {
    setIsOtpSent(false);
    setOtpSuccess(false);
    setError('');
    setOtp('');
  };

  const handleResendOtp = async () => {
    setError('');
    setOtp('');
    try {
      await axios.post(`${config.SERVER_URL}${API_ENDPOINTS.AUTH.RESEND_OTP}`, { email });
      setResendCooldown(config.OTP_RESEND_COOLDOWN_SECONDS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
      toast.error(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };





  return (
    isOtpSent ? (
      <OTPVerification
        otp={otp}
        email={email}
        loading={loading}
        error={error}
        otpSuccess={otpSuccess}
        resendCooldown={resendCooldown}
        otpDailyLimit={config.OTP_DAILY_LIMIT}
        purpose="email-verification"
        onOtpSubmit={handleOtpSubmit}
        onResendOtp={handleResendOtp}
        onRevert={handleRevert}
        onOtpChange={setOtp}
      />
    ) : (
      <RegisterForm
        username={username}
        email={email}
        password={password}
        loading={loading}
        error={error}
        onSubmit={handleRegister}
        onUsernameChange={setUsername}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />
    )
  );
};

export default Register;
