import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface DateTimePickerProps {
  timeslots: Record<string, string[]>;
  selectedDate: string;
  selectedTime: string;
  onSelect: (date: string, time: string) => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DateTimePicker({ timeslots, selectedDate, selectedTime, onSelect }: DateTimePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const availableDates = new Set(Object.keys(timeslots));

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const toKey = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const handleDateClick = (day: number) => {
    const key = toKey(viewYear, viewMonth, day);
    if (!availableDates.has(key)) return;
    const date = new Date(viewYear, viewMonth, day);
    if (date < today) return;
    onSelect(key, "");
  };

  const handleTimeClick = (time: string) => {
    onSelect(selectedDate, time);
  };

  const timesForDate = selectedDate ? timeslots[selectedDate] ?? [] : [];

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
  };

  return (
    <div className="space-y-4">
      {/* Calendar */}
      <div className="border border-black/8 rounded-2xl overflow-hidden">
        {/* Month navigation */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-black/40" />
          </button>
          <span className="text-sm font-bold tracking-tight">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-black/40" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 px-3 pt-3">
          {DAYS.map(day => (
            <div key={day} className="text-center text-[10px] font-bold text-black/30 uppercase tracking-widest pb-2">
              {day}
            </div>
          ))}
        </div>

        {/* Date grid */}
        <div className="grid grid-cols-7 px-3 pb-4 gap-y-1">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = toKey(viewYear, viewMonth, day);
            const date = new Date(viewYear, viewMonth, day);
            const isPast = date < today;
            const isAvailable = availableDates.has(key) && !isPast;
            const isSelected = key === selectedDate;
            const isToday = date.getTime() === today.getTime();

            return (
              <div key={day} className="flex items-center justify-center">
                <button
                  onClick={() => handleDateClick(day)}
                  disabled={!isAvailable}
                  className={`
                    w-9 h-9 rounded-full text-sm font-medium transition-all duration-200
                    ${isSelected
                      ? "bg-black text-white font-bold"
                      : isAvailable
                        ? "hover:bg-black/8 text-black cursor-pointer"
                        : "text-black/20 cursor-default"
                    }
                    ${isToday && !isSelected ? "ring-1 ring-black/20" : ""}
                  `}
                >
                  {day}
                  {isAvailable && !isSelected && (
                    <span className="block w-1 h-1 rounded-full bg-black/30 mx-auto -mt-0.5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeslots */}
      {selectedDate && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5 text-black/30" strokeWidth={1.5} />
            <p className="text-xs font-bold text-black/40 uppercase tracking-widest">
              Available times · {formatDisplayDate(selectedDate)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {timesForDate.map(time => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedTime === time
                    ? "bg-black text-white"
                    : "bg-black/5 text-black hover:bg-black/10"
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
