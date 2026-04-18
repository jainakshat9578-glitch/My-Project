import { ExternalLink, MessageCircle, FileText, Image as ImageIcon, Video, File, Clock } from 'lucide-react';
import { useStore } from '../../utils/store.js';


const TypeIcon = ({ type }) => {
  switch (type) {
    case 'url':
      return <ExternalLink size={16} className="text-blue-400" />;

    case 'text':
      return <FileText size={16} className="text-zinc-400" />;

    case 'image':
      return <ImageIcon size={16} className="text-emerald-400" />;

    case 'video':
      return <Video size={16} className="text-red-400" />;

    default:
      return <FileText size={16} className="text-zinc-400" />;
  }
};


const formatTimeAgo = (dateString) => {
  const diffHours = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60));
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
};

export default function ContentCard({ item, isResurfaced }) {

  const { deleteItem } = useStore();

  return (
    <div className={`glass-card p-5 group flex flex-col h-full relative overflow-hidden ${isResurfaced ? 'border-primary/30 shadow-primary/10 bg-primary/5' : ''}`}>
      {/* Resurfaced Badge/Glow */}
      {isResurfaced && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none" />
      )}
      
      <div className="flex items-start justify-between mb-4 z-10 relative">
        <div className="flex items-center gap-2">
          <div className="bg-surface p-2 rounded-lg border border-white/5">
            <TypeIcon type={item.type || "text"} />
          </div>
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{item.type}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Clock size={14} />
          {formatTimeAgo(item.createdAt)}
        </div>
      </div>

{item.type === "image" && (
  <span className="text-xs text-emerald-400">IMAGE</span>
)}
 


      <h3 className="text-lg font-semibold text-zinc-100 mb-3 line-clamp-2 z-10 relative group-hover:text-primary-glow transition-colors">
        {item.title}
      </h3>

      

      <div className="mt-auto z-10 relative">
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags?.map(tag => (
            <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-white/5 text-zinc-300 rounded-md border border-white/5 whitespace-nowrap">
              {tag}
            </span>
          ))}
          <button className='bg-red-600 rounded-md w-[60px] '
           onClick={() => deleteItem(item._id)}>
  Delete
</button>

        </div>

        {item?.url && item.type !== "text" && (
  <a 
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
  >
    View Original
  </a>
)}

        
      </div>
    </div>
  );
}
