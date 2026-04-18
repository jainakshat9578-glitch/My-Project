import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAllContent,createContent,deleteContent} from '../services/app.js';

export const useStore = create(
persist(
(set, get) => ({
  items: [],
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  fetchItems: async () => {
  try {
    const res = await getAllContent();

    console.log("API RESPONSE:", res);

    const data = res?.contents || [];

    console.log("FINAL ITEMS:", data);

    set({ items: data });

  } catch (err) {
    console.error("Fetch error:", err);
  }
},

addItem: async (formData)=>{
  try{

    const res = await createContent(formData);

    set((state)=>({
      items:[res.data.newContent, ...state.items]
    }))

    setTimeout(()=>{
  get().fetchItems()
},2000)

setTimeout(()=>{
  get().fetchItems()
},5000)

    return res.data.newContent;

  }catch(err){
    console.error("ERROR : ",err)
    throw err
  }
},


deleteItem: async (id) => {
  await deleteContent(id);

  set((state) => ({
    items: state.items.filter(item => item._id !== id),
  }));
},

getFilteredItems:()=>{
  const {items,searchQuery} = get()

  if(!searchQuery) return items;

  const query = searchQuery.toLowerCase()

  return items.filter(item=>
    item.title?.toLowerCase().includes(query)||
    item.content?.toLowerCase().includes(query)||
    item.url?.toLowerCase().includes(query)||
    item.tags?.join("").toLowerCase().includes(query)||
    item.type?.toLowerCase().includes(query)
  )
},

}),
{
name: "second-brain-storage"
}
)
);
