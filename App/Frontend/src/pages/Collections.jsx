import { Folder, Layers } from 'lucide-react';
import { useStore } from '../utils/store.js';
import { useState } from 'react';

export default function Collections() {

  const items = useStore((state)=>state.items);

  const [selectedType, setSelectedType] = useState(null)

  const counts = {
    image: items.filter(i=>i.type === "image").length,
    video: items.filter(i => i.type === "video").length,
    text: items.filter(i => i.type === "text").length,
    url: items.filter(i => i.type === "url").length,
  }
  
  const filteredItems = selectedType ? items.filter(i=>(i.type || "text")===selectedType) : items;

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-surface border border-white/10 text-zinc-300">
            <Folder size={24} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Collections</h1>
        </div>
        <p className="text-zinc-400">Curated groups of related content.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {[
    { title: "Images", count: counts.image, color: "from-pink-500/20 to-purple-500/20", type:"image" },
    { title: "Videos", count: counts.video, color: "from-blue-500/20 to-cyan-500/20" , type:"video"},
    { title: "Text", count: counts.text, color: "from-emerald-500/20 to-green-500/20" ,type:"text"},
    { title: "URLs", count: counts.url, color: "from-orange-500/20 to-yellow-500/20" , type:"url"},
  ].map(collection => (
    <div
      key={collection.title}
      onClick={()=>setSelectedType(collection.type)}
      className="glass-card p-6 flex flex-col group cursor-pointer"
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${collection.color} border border-white/10 flex items-center justify-center mb-6`}
      >
        <Layers className="text-zinc-300" size={20} />
      </div>

      <h3 className="text-lg font-semibold text-zinc-100 mb-1 group-hover:text-primary-glow transition-colors">
        {collection.title}
      </h3>

      <p className="text-sm text-zinc-500">
        {collection.count} items
      </p>
    </div>
  ))}
</div>

{selectedType && (
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4 capitalize">
      {selectedType} items
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.map(item => (
        <div key={item._id} className="glass-card p-4">
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-zinc-400">{item.content}</p>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}
