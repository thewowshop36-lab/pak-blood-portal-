import React from 'react';

interface HelplinesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ur' | 'en';
}

const helplines = [
  {
    nameUrdu: "ریسکیو 1122 (پنجاب و کے پی کے)",
    nameEn: "Rescue 1122 Emergency",
    phone: "1122",
    descUrdu: "طبی ایمرجنسی اور ایمبولینس سروس",
    icon: "🚑"
  },
  {
    nameUrdu: "ایدھی فاؤنڈیشن ایمبولینس سروس",
    nameEn: "Edhi Foundation Ambulance",
    phone: "115",
    descUrdu: "ملک گیر ہنگامی ایمبولینس نیٹ ورک",
    icon: "🚨"
  },
  {
    nameUrdu: "فاطمید فاؤنڈیشن بلڈ بینک",
    nameEn: "Fatimid Foundation Blood Bank",
    phone: "02132225284",
    descUrdu: "تھیلیسیمیا اور ہیموفیلیا کے مریضوں کے لیے محفوظ خون",
    icon: "🩸"
  },
  {
    nameUrdu: "سندس فاؤنڈیشن بلڈ سنٹر",
    nameEn: "Sundas Foundation",
    phone: "04237422141",
    descUrdu: "لاہور، گوجرانوالہ، سیالکوٹ، فیصل آباد سنٹرز",
    icon: "🏥"
  },
  {
    nameUrdu: "انڈس ہسپتال بلڈ سنٹر (کراچی / ملتان)",
    nameEn: "Indus Hospital Blood Services",
    phone: "021111111880",
    descUrdu: "۱۰۰ فیصد محفوظ اور مفت بلڈ ٹرانسفیوژن",
    icon: "💉"
  },
  {
    nameUrdu: "ہلال احمر پاکستان (Red Crescent)",
    nameEn: "Pakistan Red Crescent Society",
    phone: "0519250404",
    descUrdu: "نیشنل بلڈ ڈونر پروگرام",
    icon: "⛑️"
  }
];

export const HelplinesModal: React.FC<HelplinesModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl">
              📞
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'ur' ? 'ایمرجنسی ہیلپ لائنز و بلڈ بینکس' : 'Emergency Helplines & Blood Banks'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ur' ? 'پاکستان کے تصدیق شدہ فلاحی و ہنگامی رابطہ نمبرز' : 'Verified Pakistan Blood Services'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {helplines.map((h, i) => (
            <div
              key={i}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-800">
                  {h.icon}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {lang === 'ur' ? h.nameUrdu : h.nameEn}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {h.descUrdu}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${h.phone}`}
                className="bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1 shadow-md shadow-rose-600/20"
              >
                <span>📞</span>
                <span>{h.phone}</span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-2xl transition cursor-pointer"
          >
            {lang === 'ur' ? 'بند کریں' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
