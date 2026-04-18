import { useState } from 'react';
import { Search, Plus, Bell, LogIn } from 'lucide-react';
import { useStore } from '../../utils/store.js';
import { useAuthStore } from '../../store/auth.store.js';
import { useLocation } from 'react-router-dom';
import UserAvatar from '../auth/UserAvatar.jsx';
import AuthModal from '../auth/AuthModal.jsx';

export default function Header({ onAddClick }) {
  const { searchQuery, setSearchQuery } = useStore();
  const { isAuthenticated } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const location = useLocation();

 const handleAddClick = () => {
  onAddClick();
};


  return (
    <header className="h-16 lg:h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-10 w-full">
      {location.pathname === "/explore" ? (
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-zinc-500 group-focus-within:text-primary-glow transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full bg-surface/50 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
              placeholder="Search your brain... (Semantic Search)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div className="flex items-center gap-4 ml-6">
      

        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-full font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Content</span>
        </button>

        <UserAvatar onOpenAuth={() => setIsAuthModalOpen(true)} />

      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}
