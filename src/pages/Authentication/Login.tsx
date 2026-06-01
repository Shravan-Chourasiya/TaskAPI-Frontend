import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Terminal } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.login(email, password).then(() => {
      toast.success('Login successful!');
      navigate('/dashboard');
    }).catch((error: Error) => {
      toast.error(error.message || 'Login failed. Please try again.');
    });
  }
  return (
    <div className="flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-[11.5px] font-bold tracking-widest uppercase mb-4">
            <Terminal className="w-3 h-3" />
            Secure Access
          </div>
          <h1 className="text-[46px] md:text-[57.5px] font-extrabold text-on-surface mb-3 -tracking-[0.02em]">
            Welcome Back
          </h1>
          <p className="text-secondary text-[20.7px]">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="bg-surface-container-low p-8 rounded-3xl shadow-ambient">
          <form onSubmit={handleLogin} className="space-y-6">

            <div className="space-y-2">
              <label htmlFor="email" className="block text-[16.1px] font-bold text-on-surface">
                Your Registered Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors text-[16.1px]"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-[16.1px] font-bold text-on-surface">
                  Your Password
                </label>
                <Link to="/forgot-password" className="text-[13.8px] text-primary font-bold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors text-[16.1px]"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={auth.isLoading}
              size="lg"
              className="w-full text-[16.1px]"
            >
              {auth.isLoading ? 'Signing in...' : 'Sign In'}
              {!auth.isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary text-[16.1px]">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-secondary text-[16.1px] hover:text-on-surface transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
