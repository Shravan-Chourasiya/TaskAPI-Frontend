import { ArrowRight, RotateCcw, Mail, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type OTPPurpose = 'email-verification' | 'password-reset' | 'two-factor-auth';

interface OTPVerificationProps {
    otp: string;
    email: string;
    loading: boolean;
    error: string;
    otpSuccess: boolean;
    resendCooldown: number;
    otpDailyLimit: number;
    purpose: OTPPurpose;
    onOtpSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onResendOtp: () => void;
    onRevert: () => void;
    onOtpChange: (value: string) => void;
}

const purposeConfig = {
    'email-verification': {
        icon: Mail,
        title: 'Email Verification',
        description: 'Enter the 6-digit code sent to',
        successTitle: 'Email Verified!',
        successMessage: 'Redirecting to dashboard...',
        buttonText: 'Verify Email',
        backText: '← Back to Register'
    },
    'password-reset': {
        icon: Lock,
        title: 'Reset Password',
        description: 'Enter the 6-digit code sent to',
        successTitle: 'Code Verified!',
        successMessage: 'Redirecting to reset password...',
        buttonText: 'Verify Code',
        backText: '← Back to Login'
    },
    'two-factor-auth': {
        icon: ShieldCheck,
        title: 'Two-Factor Authentication',
        description: 'Enter the 6-digit code sent to',
        successTitle: 'Authentication Successful!',
        successMessage: 'Redirecting to dashboard...',
        buttonText: 'Verify Code',
        backText: '← Back to Login'
    }
};

const OTPVerification: React.FC<OTPVerificationProps> = ({
    otp,
    email,
    loading,
    error,
    otpSuccess,
    resendCooldown,
    otpDailyLimit,
    purpose,
    onOtpSubmit,
    onResendOtp,
    onRevert,
    onOtpChange,
}) => {
    const config = purposeConfig[purpose];
    const IconComponent = config.icon;

    const formatCooldown = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <div className="bg-surface-container-low p-8 rounded-3xl shadow-ambient">
                    {otpSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-on-surface mb-2">{config.successTitle}</h3>
                            <p className="text-secondary">{config.successMessage}</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <IconComponent className="w-8 h-8 text-primary" />
                                </div>
                                <h1 className="text-3xl font-extrabold text-on-surface mb-2">{config.title}</h1>
                                <p className="text-secondary text-sm">
                                    {config.description}
                                </p>
                                <p className="text-on-surface font-semibold text-sm break-all mt-1">{email}</p>
                            </div>

                            {error && (
                                <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm mb-4">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={onOtpSubmit} className="space-y-5">
                                <input
                                    id="otp"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]{6}"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ''))}
                                    className="w-full px-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface text-center text-lg tracking-[0.35em] transition-colors"
                                    placeholder="000000"
                                    aria-label="Enter OTP"
                                    required
                                />

                                <p className="text-xs text-secondary text-center">
                                    Code expires in 10 minutes.
                                </p>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    size="lg"
                                    className="w-full"
                                >
                                    {loading ? 'Verifying...' : config.buttonText}
                                    {!loading && <ArrowRight className="w-4 h-4" />}
                                </Button>
                            </form>

                            <div className="mt-5 pt-4 border-t border-outline-variant/40 text-center space-y-2">
                                <p className="text-sm text-secondary">Did not receive the code?</p>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={onResendOtp}
                                    disabled={loading || resendCooldown > 0}
                                    className="mx-auto"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    {resendCooldown > 0 ? `Resend in ${formatCooldown(resendCooldown)}` : 'Resend OTP'}
                                </Button>
                                <p className="text-xs text-secondary">Daily limit: {otpDailyLimit} OTP requests</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onRevert}
                        className="text-secondary hover:text-on-surface"
                    >
                        {config.backText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
