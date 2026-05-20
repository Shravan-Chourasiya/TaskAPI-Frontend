import { Link } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold tracking-widest uppercase mb-6">
                        <Terminal className="w-3 h-3" />
                        New Account
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 -tracking-[0.02em]">
                        Create Account
                    </h1>
                    <p className="text-secondary text-lg">
                        Join TaskAPI and start building
                    </p>
                </div>

                <div className="bg-surface-container-low p-8 rounded-3xl shadow-ambient">
                    <form onSubmit={onSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-bold text-on-surface">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => onUsernameChange(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                                    placeholder="Choose a unique username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-bold text-on-surface">
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
                            <label htmlFor="password" className="block text-sm font-bold text-on-surface">
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
                            {loading ? 'Creating Account...' : 'Create Account'}
                            {!loading && <ArrowRight className="w-4 h-4" />}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-secondary text-sm">
                            Already have an account?{' '}
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

export default RegisterForm;