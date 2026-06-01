import { Link } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, Terminal, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { apiInstance } from '@/lib/axiosInstance';
import { USERNAME_REGEX, USERNAME_CHECK_DEBOUNCE_MS, USERNAME_CHECK_DELAY_MS } from '@/constants';
import { toast } from 'sonner';

interface RegisterFormProps {
    username: string;
    email: string;
    password: string;
    loading: boolean;
    error: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onUsernameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
}

const debounce = (func: (value: string) => Promise<void>, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(value), delay);
  };
};

const RegisterForm: React.FC<RegisterFormProps> = ({
    username,
    email,
    password,
    loading,
    error,
    onSubmit,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
}) => {
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
    const [usernameMessage, setUsernameMessage] = useState('');
    const [checkingUsername, setCheckingUsername] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const checkUsernameAvailability = async (value: string) => {
        if (!value.trim()) {
            setUsernameAvailable(null);
            setUsernameMessage('');
            setCheckingUsername(false);
            return;
        }

        if (value.length < 6) {
            setUsernameAvailable(false);
            setUsernameMessage('Username should be at least 6 characters');
            return;
        }

        if (!USERNAME_REGEX.test(value)) {
            setUsernameAvailable(false);
            setUsernameMessage('Invalid username format');
            return;
        }

        setCheckingUsername(true);
        await new Promise(resolve => setTimeout(resolve, USERNAME_CHECK_DELAY_MS));
        if (username !== value) return;
        
        try {
            const response = await apiInstance.get('/api/v1/check-username?username=' + encodeURIComponent(value));
            if (username !== value) return;
            setCheckingUsername(false);
            setUsernameAvailable(true);
            setUsernameMessage(response.data.message);
        } catch (error: unknown) {
            if (username !== value) return;
            setCheckingUsername(false);
            interface ErrorResponse {
                response?: {
                    data?: {
                        message?: string;
                    };
                    status?: number;
                };
            }
            const errorResponse = error && typeof error === 'object' && 'response' in error 
                ? (error as ErrorResponse).response 
                : null;
            
            const errorMessage = errorResponse?.data?.message || 'Error checking username';
            const statusCode = errorResponse?.status;
            
            if (statusCode === 429) {
                toast.error(errorMessage);
            } else if (errorMessage === 'Username is already taken') {
                setUsernameAvailable(false);
                setUsernameMessage(errorMessage);
            } else {
                toast.error(errorMessage);
            }
        }
    };

    useEffect(() => {
        if (!hasInteracted) return;
        const handler = debounce(checkUsernameAvailability, USERNAME_CHECK_DEBOUNCE_MS);
        handler(username);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, hasInteracted]);
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold tracking-widest uppercase mb-6">
                        <Terminal className="w-3 h-3" />
                        New Account
                    </div>
                    <h1 className="text-[46px] md:text-[57.5px] font-extrabold text-on-surface mb-3 -tracking-[0.02em]">
                        Create Account
                    </h1>
                    <p className="text-secondary text-[20.7px]">
                        Join TaskAPI and start building
                    </p>
                </div>

                <div className="bg-surface-container-low p-8 rounded-3xl shadow-ambient">
                    <form onSubmit={onSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-[13.8px]">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-[13.8px] font-bold text-on-surface">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => onUsernameChange(e.target.value)}
                                    onFocus={() => setHasInteracted(true)}
                                    className="w-full pl-12 pr-12 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                                    placeholder="Choose a unique username"
                                    required
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    {checkingUsername && <Loader2 className="w-5 h-5 text-secondary animate-spin" />}
                                    {!checkingUsername && usernameAvailable === true && <CheckCircle className="w-5 h-5 text-green-600" />}
                                    {!checkingUsername && usernameAvailable === false && <XCircle className="w-5 h-5 text-red-600" />}
                                </div>
                            </div>
                            {usernameMessage && (
                                <p className={`text-[11.5px] ${usernameAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                    {usernameMessage}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-[13.8px] font-bold text-on-surface">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => onEmailChange(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-[13.8px] font-bold text-on-surface">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => onPasswordChange(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                                    placeholder="Create a strong password"
                                    required
                                />
                            </div>
                            <p className="text-[11.5px] text-secondary">
                                Min 8 characters with uppercase, lowercase, number & special character
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            size="lg"
                            className="w-full"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                            {!loading && <ArrowRight className="w-4 h-4" />}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-secondary text-[13.8px]">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-bold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-secondary text-[13.8px] hover:text-on-surface transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;