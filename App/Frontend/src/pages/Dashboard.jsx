import { Sparkles, Activity } from 'lucide-react';
import { useStore } from '../utils/store.js';
import ContentCard from '../components/shared/ContentCard';
import { useEffect } from 'react';



export default function Dashboard() {
      const fetchItems = useStore((state)=>state.fetchItems)
      const items = useStore((state)=>state.items)
      const getFilteredItems = useStore((state)=>state.getFilteredItems)
  
  useEffect(()=>{
    fetchItems()
  },[])

  const filteredItems = getFilteredItems() || []

  const resurfacedItem = items?.find(item => {
    if(!item?.createdAt) return false;
    const diffHours = Math.floor((new Date() - new Date(item.createdAt)) / (1000 * 60 * 60));
    return diffHours > 24 * 30; // older than a month
  }) || items[0];

  const recentItems = filteredItems.filter(item => item && item._id !== resurfacedItem?._id).slice(0, 6);

  

  return (
    <div className="space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Your saved knowledge, all in one place.</h1>
        <p className="text-zinc-400 text-lg">Your second brain has processed 12 new items today.</p>
      </header>

      {/* Resurfaced Section */}
      {resurfacedItem && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-primary-glow" size={20} />
            <h2 className="text-xl font-semibold text-zinc-100">Resurfaced Memory</h2>
            <span className="ml-2 text-sm text-zinc-500 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">You saved this months ago</span>
          </div>
          <div className="max-w-2xl">
            <ContentCard item={resurfacedItem} isResurfaced={true} />
          </div>
        </section>
      )}

      {/* Recent Activity Section */}
      <section>
        <div className="flex items-center gap-2 mb-6 text-zinc-100">
          <Activity size={20} className="text-zinc-400" />
          <h2 className="text-xl font-semibold">Recent Captures</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recentItems.map(item => (
            <ContentCard key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
