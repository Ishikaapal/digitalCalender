import { format, isSameMonth, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';

export default function DayCell({ date, monthStart, selection, onClick, isInRange }) {
  const isStart = isSameDay(date, selection.start);
  const isEnd = isSameDay(date, selection.end);
  const activeMonth = isSameMonth(date, monthStart);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  return (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(date)}
      className={`
        relative h-12 flex items-center justify-center cursor-pointer
        ${!activeMonth ? 'text-gray-200' : isWeekend ? 'text-blue-500' : 'text-gray-700'}
        ${isInRange ? 'bg-blue-50' : ''}
        ${(isStart || isEnd) ? 'bg-blue-600 text-white rounded-full z-10 shadow-lg' : ''}
      `}
    >
      <span className="text-sm font-bold z-10">{format(date, 'd')}</span>
      
      {/* Animated Selection Label */}
      {(isStart || isEnd) && (
        <motion.span 
          layoutId="label"
          className="absolute -bottom-1 text-[7px] uppercase font-black text-blue-800 bg-white px-1 rounded shadow-sm"
        >
          {isStart ? 'Start' : 'End'}
        </motion.span>
      )}
    </motion.div>
  );
}