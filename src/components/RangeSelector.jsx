import DayCell from './DayCell';
import { eachDayOfInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export default function RangeSelector({ currentDate, selection, onDateClick }) {
  const monthStart = startOfMonth(currentDate);
  const days = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }), // Week starts on Monday
    end: endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 })
  });

  const checkInRange = (day) => {
    if (selection.start && selection.end) {
      return isWithinInterval(day, { start: selection.start, end: selection.end });
    }
    return false;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 mb-2">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, i) => (
          <div key={d} className={`text-center text-[10px] font-bold pb-2 ${i > 4 ? 'text-[#1da1f2]' : 'text-gray-400'}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {days.map(day => (
          <DayCell 
            key={day.toString()} 
            date={day} 
            monthStart={monthStart}
            selection={selection}
            onClick={onDateClick}
            isInRange={checkInRange(day)}
          />
        ))}
      </div>
    </div>
  );
}