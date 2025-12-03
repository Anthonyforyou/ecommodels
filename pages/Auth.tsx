import React, { useState } from 'react';
import { Button } from '../components/Button';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface AuthProps {
  mode: 'login' | 'register';
  onNavigate: (page: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ mode, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
            await updateProfile(userCredential.user, { displayName: name });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error(err);
      let msg = 'Authentication failed';
      if (err.code === 'auth/email-already-in-use') msg = 'Email already in use.';
      if (err.code === 'auth/invalid-email') msg = 'Invalid email address.';
      if (err.code === 'auth/weak-password') msg = 'Password is too weak.';
      if (err.code === 'auth/invalid-credential') msg = 'Invalid email or password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-[420px] w-full bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-slate-500">
            {mode === 'login' 
              ? 'Access your EcomModels dashboard' 
              : 'Start generating professional imagery'}
          </p>
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6 text-center font-medium">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
             <div>
                <label className="block text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white text-black border border-slate-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all placeholder-slate-400 font-medium"
                  placeholder="Jane Doe"
                />
             </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-white text-black border border-slate-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all placeholder-slate-400 font-medium"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-white text-black border border-slate-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all placeholder-slate-400 font-medium"
              placeholder="••••••••"
            />
          </div>

          <Button fullWidth type="submit" disabled={loading} className="mt-8 bg-black text-white hover:bg-slate-800 h-14 rounded-xl text-base font-bold tracking-wide shadow-lg">
            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        <div className="mt-10 text-center text-sm text-slate-500">
          {mode === 'login' ? (
            <>
              No account yet?{' '}
              <button onClick={() => onNavigate('register')} className="text-black font-bold hover:underline">
                Sign up free
              </button>
            </>
          ) : (
             <>
              Already have an account?{' '}
              <button onClick={() => onNavigate('login')} className="text-black font-bold hover:underline">
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};