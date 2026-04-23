import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '../utils/config';
import RegisterForm from '../components/auth/RegisterForm';
import VerifyForm from '../components/auth/VerifyForm';

const OTP_LENGTH = 6;

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
    if (!isOtpSent || otpSuccess) return;

    setResendCooldown(config.OTP_RESEND_COOLDOWN_SECONDS);

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
  }, [isOtpSent, otpSuccess]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(
        `${config.SERVER_URL}/api/v1/auth/register`,
        { username, email, password },
      );
      setError('');
      setOtp('');
      setOtpSuccess(false);
      setIsOtpSent(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedOtp = otp.replace(/\D/g, '');
    if (normalizedOtp.length !== OTP_LENGTH) {
      setError('Please enter the full 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post(
        `${config.SERVER_URL}/api/v1/auth/verify?purpose=ve-em-or`,
        { otp: normalizedOtp ,
        },
      );
      setOtpSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Account verification failed. Please try again.');
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
    try {
      await axios.post(`${config.SERVER_URL}/api/v1/auth/resend-otp`, { email });
      setResendCooldown(config.OTP_RESEND_COOLDOWN_SECONDS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  return (
    isOtpSent ? (
      <VerifyForm
        otp={otp}
        email={email}
        loading={loading}
        error={error}
        otpSuccess={otpSuccess}
        resendCooldown={resendCooldown}
        otpDailyLimit={config.OTP_DAILY_LIMIT}
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
