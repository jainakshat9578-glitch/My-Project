import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store.js';

export default function UserAvatar({ onOpenAuth }) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAvatarClick = () => {
    if (isAuthenticated) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      onOpenAuth();
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const getInitial = () => {
    if (!user?.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleAvatarClick}
        className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px] transition-transform active:scale-95 group"
      >
        <div className="w-full h-full rounded-full border-2 border-background overflow-hidden bg-surface flex items-center justify-center text-zinc-100 font-bold">
          {isAuthenticated ? (
            <span className="text-sm">{getInitial()}</span>
          ) : (
            <User size={20} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isAuthenticated && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 border-b border-white/5 mb-1 text-left">
            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
            <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
