import React from 'react';
import { Donor } from '../types';

interface BloodGroupGridProps {
  selectedBlood?: string | null;
  selected?: string | null;
  onSelect: (bg: string) => void;
  donors?: Donor[];
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
}

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const BloodGroupGrid: React.FC<BloodGroupGridProps> = ({
  selectedBlood,
  selected,
  onSelect,
  donors = [],
  lang,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const currentSelected = selectedBlood !== undefined ? selectedBlood : selected;

  // خود بخود ہر بلڈ گروپ کے ڈونرز کی گنتی کرنا
  const counts = bloodGroups.reduce((acc, bg) => {
    acc[bg] = donors.filter(d => (d.bloodgroup || d.bloodGroup || d.blood_group) === bg).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className={`text-sm font-black flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping inline-block" />
          {lang === 'ur' ? 'بلڈ گروپ منتخب کریں' : 'Select Blood Group'}
        </h3>
        {currentSelected && currentSelected !== 'All / تمام' && (
          <button
            onClick={() => onSelect('All / تمام')}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold underline cursor-pointer"
          >
            {lang === 'ur' ? 'تمام گروپس دکھائیں' : 'Show All Groups'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
        {bloodGroups.map((bg) => {
          const isSelected = currentSelected === bg;
          const count = counts[bg] || 0;

          return (
            <button
              key={bg}
              type="button"
              onClick={() => onSelect(isSelected ? 'All / تمام' : bg)}
              className={`relative overflow-hidden rounded-2xl p-3 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer text-center group active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-b from-rose-600 via-rose-700 to-rose-900 text-white shadow-lg shadow-rose-600/40 ring-2 ring-rose-500 -translate-y-1 scale-105'
                  : isDark
                  ? 'bg-slate-900 text-slate-200 border border-slate-800 hover:border-rose-500/50 shadow-md'
                  : 'bg-white hover:bg-rose-50/60 text-slate-800 border border-slate-200 hover:border-rose-400 shadow-sm hover:shadow'
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />

              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${
                  isSelected
                    ? 'bg-white/20 text-white shadow-inner'
                    : isDark
                    ? 'bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20'
                    : 'bg-rose-50 text-rose-600 group-hover:bg-rose-100'
                }`}
              >
                <span className="text-base font-black">🩸</span>
              </div>

              <span className="text-base sm:text-lg font-black tracking-tight leading-none mb-1">
                {bg}
              </span>

              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition ${
                  isSelected
                    ? 'bg-black/30 text-rose-200'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 group-hover:text-rose-300'
                    : 'bg-slate-100 text-slate-700 group-hover:bg-rose-100 group-hover:text-rose-700'
                }`}
              >
                {count} {lang === 'ur' ? 'ڈونرز' : 'Donors'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
