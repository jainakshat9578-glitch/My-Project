import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState } from 'react';
import AddContentModal from './AddContentModal';
import { useAuthStore } from '../../store/auth.store.js';

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
const [authOpen,setAuthOpen] = useState(!isAuthenticated)

  return (
    <div className="flex bg-background min-h-screen font-sans text-zinc-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onAddClick={()=> setOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          {/* Subtle background gradient blob for aesthetics */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
          <Outlet />
        </main>
      </div>
      {open && (
        <AddContentModal onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
