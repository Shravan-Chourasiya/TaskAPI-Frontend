import { ArrowRight, RotateCcw } from 'lucide-react';

interface VerifyFormProps {
    otp: string;
    email: string;
    loading: boolean;
    error: string;
    otpSuccess: boolean;
    resendCooldown: number;
    otpDailyLimit: number;
    onOtpSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onResendOtp: () => void;
    onRevert: () => void;
    onOtpChange: (value: string) => void;
}

const VerifyForm: React.FC<VerifyFormProps> = ({
    otp,
    email,
    loading,
    error,
    otpSuccess,
    resendCooldown,
    otpDailyLimit,
    onOtpSubmit,
    onResendOtp,
    onRevert,
    onOtpChange,
}) => {
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
                                <ArrowRight className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-on-surface mb-2">Account Verified!</h3>
                            <p className="text-secondary">Redirecting to dashboard...</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-extrabold text-on-surface mb-2">OTP Verification</h1>
                                <p className="text-secondary text-sm">
                                    Enter the 6-digit code sent to
                                </p>
                                <p className="text-on-surface font-semibold text-sm break-all">{email}</p>
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
                                    placeholder="123456"
                                    aria-label="Enter OTP"
                                    required
                                />

                                <p className="text-xs text-secondary text-center">
                                    Code expires in 10 minutes.
                                </p>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:bg-primary-container transition-[background-color,transform] hover:scale-[1.02] active:scale-[0.98] duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                    {!loading && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </form>

                            <div className="mt-5 pt-4 border-t border-outline-variant/40 text-center space-y-2">
                                <p className="text-sm text-secondary">Did not receive the code?</p>
                                <button
                                    type="button"
                                    onClick={onResendOtp}
                                    disabled={loading || resendCooldown > 0}
                                    className="mx-auto inline-flex items-center justify-center gap-2 text-primary font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    {resendCooldown > 0 ? `Resend in ${formatCooldown(resendCooldown)}` : 'Resend OTP'}
                                </button>
                                <p className="text-xs text-secondary">Daily limit: {otpDailyLimit} OTP requests</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={onRevert}
                        className="text-secondary text-sm hover:text-on-surface transition-colors"
                    >
                        ← Back to Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyForm;