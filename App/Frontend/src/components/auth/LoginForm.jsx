import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store.js';

export default function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, loading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-300">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-400 ml-1">Email</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Mail size={18} className="text-zinc-500 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-400 ml-1">Password</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock size={18} className="text-zinc-500 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            required
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>
      )}

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-primary hover:bg-blue-600 disabled:bg-primary/50 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2"
      >
        {loading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}
