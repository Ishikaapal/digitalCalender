import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import Header from './Header';
import RangeSelector from './RangeSelector';
import NotesPanel from './NotesPanel';
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';

export default function Calendar() {
  // 1. DEFAULT TO CURRENT DATE: Changed from new Date(2026, 0, 1) to new Date()
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Track month index (for keying) and flip direction
  const [[page, direction], setPage] = useState([0, 0]); 
  
  const [selection, setSelection] = useState({ start: null, end: null });
  const [allNotes, setAllNotes] = useState({});

  // Unique key for AnimatePresence and Notes (e.g., "04-2024")
  const currentMonthKey = format(currentDate, 'MM-yyyy');

  const paginate = (newDirection) => {
    // This handles the Year transition automatically
    // e.g., Jan 2025 -> subMonths -> Dec 2024
    setPage([page + newDirection, newDirection]);
    if (newDirection === 1) {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const updateNotes = (val) => {
    setAllNotes({ ...allNotes, [currentMonthKey]: val });
  };

  const variants = {
    enter: (direction) => ({
      rotateX: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateX: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      rotateX: direction > 0 ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-stone-200 flex flex-col items-center justify-center p-6 perspective-1000">
      <div className="bg-white shadow-2xl w-full max-w-2xl overflow-hidden rounded-lg border border-stone-200">
        
        {/* Header will now reflect the correct Year and Month */}
        <Header currentDate={currentDate} direction={direction} />

        <div className="p-8 relative">
          <div className="flex justify-between items-center mb-6 relative z-10">
            <button onClick={() => paginate(-1)} className="text-black hover:text-blue-600 transition-all active:scale-90">
              <IoMdArrowDropleft className="w-12 h-12" title="Previous"/>
            </button>
            <button onClick={() => paginate(1)} className="text-black hover:text-blue-600 transition-all active:scale-90">
              <IoMdArrowDropright className="w-12 h-12" title="Next"/>
            </button>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentMonthKey} // Key changes when month OR year changes
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                rotateX: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              style={{ transformOrigin: "top" }}
              className="flex gap-8 flex-col md:flex-row"
            >
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
                  onDateClick={(date) => {
                    if (!selection.start || (selection.start && selection.end)) {
                      setSelection({ start: date, end: null });
                    } else {
                      date < selection.start 
                        ? setSelection({ start: date, end: selection.start })
                        : setSelection({ ...selection, end: date });
                    }
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {selection.start && (
          <div className="bg-blue-600 text-white p-3 text-center text-xs font-bold uppercase tracking-widest">
            Selected: {format(selection.start, 'MMM dd, yyyy')} 
            {selection.end ? ` — ${format(selection.end, 'MMM dd, yyyy')}` : ' (Select End Date)'}
          </div>
        )}
      </div>
    </div>
  );
}