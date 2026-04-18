import { useStore } from '../utils/store';
import ContentCard from '../components/shared/ContentCard';
import { Compass } from 'lucide-react';
import { searchContent } from '../services/app.js';
import { useState, useEffect } from 'react';

export default function SearchExplore() {
  
const searchQuery = useStore((s)=>s.searchQuery);
const items = useStore((s)=>s.items)


const [results, setResults] = useState([])

const bestMatch = searchQuery ? results[0] : null;



useEffect(() => {



  const timer = setTimeout(async () => {

    if (!searchQuery) {
      setResults(items);
      return;
    }

    try {
      const data = await searchContent(searchQuery);
      setResults(data);
    } catch (err) {
      setResults(items);
    }

  }, 400); // delay

  return () => clearTimeout(timer);

}, [searchQuery, items]);


  return (
    <div className="space-y-8 h-full flex flex-col">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/20 text-primary-glow">
            <Compass size={24} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
        </div>
        <p className="text-zinc-400">
          {searchQuery 
            ? `Semantic search results for "${searchQuery}"` 
            : 'Explore your knowledge base by recent, topics, or AI clusters.'}
        </p>
      </header>

      {searchQuery && bestMatch && (
  <div className="mb-6">
    <p className="text-sm text-zinc-400 mb-3">
      Best semantic match
    </p>

    <ContentCard
      item={bestMatch}
      isResurfaced={true}
    />
  </div>
)}


      {results.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-2xl bg-surface/30">
          <div className="text-center">
            <p className="text-zinc-400 text-lg mb-2">No results found in your brain.</p>
            <p className="text-sm text-zinc-500">Try adjusting your search terms.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(searchQuery ? results.slice(1) : results).map(item => (
            <ContentCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
