import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import Header from './Header';
import RangeSelector from './RangeSelector';
import NotesPanel from './NotesPanel';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selection, setSelection] = useState({ start: null, end: null });
  
  // Data Persistence: Key notes by the "Month-Year" string
  const [allNotes, setAllNotes] = useState({});

  const currentMonthKey = format(currentDate, 'MM-yyyy');

  const updateNotes = (val) => {
    setAllNotes({ ...allNotes, [currentMonthKey]: val });
  };

  const handleDateClick = (date) => {
    if (!selection.start || (selection.start && selection.end)) {
      setSelection({ start: date, end: null });
    } else {
      date < selection.start 
        ? setSelection({ start: date, end: selection.start })
        : setSelection({ ...selection, end: date });
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl w-full max-w-2xl overflow-hidden rounded-lg">
        <Header currentDate={currentDate} />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="text-black hover:text-blue-600 transition-colors">Prev</button>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="text-black hover:text-blue-600 transition-colors">Next</button>
          </div>

          <div className="flex gap-8 flex-col md:flex-row">
            <div className="md:w-1/3">
              <NotesPanel 
                notes={allNotes[currentMonthKey] || ""} 
                setNotes={updateNotes} 
              />
            </div>
            <div className="md:w-2/3">
              <RangeSelector 
                currentDate={currentDate}
                selection={selection}
                onDateClick={handleDateClick}
              />
            </div>
          </div>
        </div>
        
        {/* Selection Status Bar */}
        {selection.start && (
          <div className="bg-blue-600 text-white p-3 text-center text-xs font-bold uppercase tracking-widest">
            Selected: {format(selection.start, 'MMM dd')} 
            {selection.end ? ` — ${format(selection.end, 'MMM dd')}` : ' (Select End Date)'}
          </div>
        )}
      </div>
    </div>
  );
}