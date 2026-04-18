import { useState,useRef } from "react";
import { useStore } from "../../utils/store.js"

export default function AddContentModal({ onClose }) {
  const { addItem } = useStore();

  const [form, setForm] = useState({
    title: "",
    url: "",
    content: "",
  });

  const [file, setFile] = useState(null)
  const fileRef = useRef()

  const handleFile = (e) => {
  const selected = e.target.files[0];

  setFile(selected);

  setForm(prev => ({
    ...prev,
    file: selected
  }));
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("url", form.url);
    formData.append("content", form.content);

    if (file) {
      formData.append("file", file);
    }

    try {
      await addItem(formData);
      onClose(); // close modal only after successful save
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save content. Check console for details.");
    }
  };

return (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    
    <div className="w-full max-w-lg bg-slate-900/90 border border-slate-700 rounded-2xl p-6 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-100">
          Add Content
        </h2>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      {/* Upload Buttons */}
<div className="flex gap-3 mb-4">

  <button
    type="button"
    onClick={() => fileRef.current.click()}
    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-200"
  >
    📁 Add Image / Video
  </button>

  <input
    type="file"
    ref={fileRef}
    onChange={handleFile}
    accept="image/*,video/*"
    className="hidden"
  />

</div>


      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Title"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="URL"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />

        <textarea
          placeholder="Description"
          rows={4}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            Save 🚀
          </button>

          {file && (
  <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300">
    Selected: {file.name}
  </div>
)}


        </div>
      </form>

    </div>
  </div>
);

}
