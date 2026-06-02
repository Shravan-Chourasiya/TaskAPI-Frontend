import { ArrowRight, RotateCcw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';

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
        icon: ShieldCheck,
        title: 'Verify Your Account',
        description: 'Code sent to',
        successTitle: 'Email Verified!',
        successMessage: 'Redirecting to dashboard...',
        buttonText: 'Verify Email',
        backText: '← Back to Register'
    },
    'password-reset': {
        icon: ShieldCheck,
        title: 'Reset Password',
        description: 'Code sent to',
        successTitle: 'Code Verified!',
        successMessage: 'Redirecting to reset password...',
        buttonText: 'Verify Code',
        backText: '← Back to Login'
    },
    'two-factor-auth': {
        icon: ShieldCheck,
        title: 'Two-Factor Authentication',
        description: 'Code sent to',
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
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const formatCooldown = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        onOtpChange(otpValues.join(''));
    }, [otpValues, onOtpChange]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value.slice(-1);
        setOtpValues(newOtpValues);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
        const newOtpValues = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
        setOtpValues(newOtpValues.slice(0, 6));
        const nextEmptyIndex = newOtpValues.findIndex(val => !val);
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus();
        } else {
            inputRefs.current[5]?.focus();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-4">
            <div className="w-full max-w-md">
                <div className="bg-surface-container-low p-8 rounded-3xl shadow-ambient border-2 border-outline-variant">
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
                                <h2 className="text-2xl font-bold text-on-surface mb-4">
                                    An OTP is sent to your registered email
                                </h2>
                                <p className="text-on-surface font-semibold break-all">{email}</p>
                            </div>

                            {error && (
                                <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm mb-4">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={onOtpSubmit} className="space-y-5">
                                <div className="flex gap-2 justify-center">
                                    {otpValues.map((value, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={value}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={handlePaste}
                                            placeholder="-"
                                            className="w-12 h-14 bg-surface-container rounded-xl border-2 border-primary outline-none text-on-surface text-center text-xl font-semibold transition-colors focus:ring-2 focus:ring-primary/20"
                                            aria-label={`OTP digit ${index + 1}`}
                                            required
                                        />
                                    ))}
                                </div>

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

                            <div className="mt-5 pt-4 border-t border-outline-variant/40 flex items-center justify-between gap-2">
                                <p className="text-sm text-secondary">Didn't receive the code?</p>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={onResendOtp}
                                    disabled={loading || resendCooldown > 0}
                                    className="p-0 h-auto"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    {resendCooldown > 0 ? `Resend in ${formatCooldown(resendCooldown)}` : 'Resend OTP'}
                                </Button>
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
                        ← <span className="underline">{config.backText.replace('← ', '')}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
