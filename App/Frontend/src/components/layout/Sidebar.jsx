import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Folder, Network, Settings } from 'lucide-react';


export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Collections', path: '/collections', icon: Folder },
    { name: 'Graph View', path: '/graph', icon: Network },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-surface/30 backdrop-blur-xl hidden md:flex flex-col flex-shrink-0 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary-glow">
            <Network size={20} />
          </div>
          <span className="font-semibold text-lg tracking-tight">Second Brain</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        <div className="text-xs font-medium text-zinc-500 mb-4 px-2 tracking-wider uppercase">Menu</div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/10 text-primary-glow font-medium' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-primary-glow' : 'text-zinc-400'} />
              {item.name}
            </Link>
          );
        })}

 

      </nav>
    </aside>
  );
}
