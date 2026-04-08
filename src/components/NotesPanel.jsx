export default function NotesPanel({ notes, setNotes }) {
  return (
    <div className="flex flex-col h-full border-r border-gray-100 pr-4">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Daily Memos</h3>
      <div className="relative flex-1">
        {/* Lined Paper Aesthetic */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-7 border-b border-gray-100 w-full" />
          ))}
        </div>
        <textarea 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="relative z-10 w-full h-full bg-transparent border-none focus:ring-0 text-sm text-gray-600 leading-7 resize-none"
          placeholder="New month, new goals..."
        />
      </div>
    </div>
  );
}