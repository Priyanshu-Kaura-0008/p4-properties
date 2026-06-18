import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApiErrorMessage } from '../../services/api';

const input = 'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues: { remember: true } });

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password, values.remember);
      toast.success('Welcome back');
      navigate('/admin');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Invalid login credentials'));
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] p-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.06),transparent_42%)]" />
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#1A1A1A]/90 p-6 shadow-[0_24px_90px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">Admin Login</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">P4 Properties</h1>
        <p className="mt-2 text-white/55">Luxury real estate command center.</p>
        <div className="mt-8 grid gap-4">
          <input className={input} placeholder="Email" type="email" {...register('email', { required: true })} />
          <input className={input} placeholder="Password" type="password" {...register('password', { required: true })} />
          <label className="flex items-center gap-3 text-sm font-semibold text-white/70">
            <input type="checkbox" className="h-4 w-4 accent-gold" {...register('remember')} />
            Remember Me
          </label>
          <button disabled={isSubmitting} className="min-h-12 rounded-xl bg-gold px-6 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night hover:bg-white disabled:opacity-60">
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </motion.form>
    </main>
  );
}
