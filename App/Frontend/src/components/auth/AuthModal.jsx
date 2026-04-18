import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store.js';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const { clearError } = useAuthStore();

  if (!isOpen) return null;

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-zinc-400 text-sm">
              {isLogin ? 'Sign in to access your second brain' : 'Start building your digital knowledge base'}
            </p>
          </div>

          {isLogin ? (
            <LoginForm onSuccess={onClose} />
          ) : (
            <RegisterForm onSuccess={onClose} />
          )}

          <p className="text-center mt-6 text-sm text-zinc-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={toggleMode}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
