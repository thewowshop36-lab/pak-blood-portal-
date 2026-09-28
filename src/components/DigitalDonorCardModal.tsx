import React from 'react';
import { Donor } from '../types';

interface DigitalDonorCardModalProps {
  donor: Donor | null;
  onClose: () => void;
  lang: 'ur' | 'en';
}

export const DigitalDonorCardModal: React.FC<DigitalDonorCardModalProps> = ({
  donor,
  onClose,
  lang
}) => {
  if (!donor) return null;

  const bg = donor.blood_group || donor.bloodgroup || donor.bloodGroup || 'O+';
  const name = donor.name || 'محترم ڈونر';
  const city = donor.city || 'پاکستان';
  const regId = `PK-BD-${(donor.id || Math.floor(1000 + Math.random() * 9000)).toString().slice(-4)}`;

  const shareText = `🩸 *پاکستان بلڈ پورٹل - لائف سیور کارڈ* 🩸\n\n👤 *نام:* ${name}\n🩸 *بلڈ گروپ:* ${bg}\n📍 *شہر:* ${city}\n🆔 *کارڈ آئی ڈی:* ${regId}\n\nمیں نے پاکستان بلڈ پورٹل پر بطور رضاکار بلڈ ڈونر رجسٹریشن کروائی ہے۔ انسانیت کی خدمت میں ہمارا ساتھ دیں!\n🔗 https://pak-blood-portal.vercel.app`;

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl text-white">
        {/* Top Header */}
        <div className="p-4 bg-gradient-to-r from-rose-700 via-rose-600 to-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎖️</span>
            <div>
              <h3 className="text-sm font-black tracking-tight">
                {lang === 'ur' ? 'ڈیجیٹل لائف سیور شناختی کارڈ' : 'Digital Life Saver Donor Card'}
              </h3>
              <p className="text-[10px] text-rose-100">
                {lang === 'ur' ? 'تصدیق شدہ رضاکار خون کا عطیہ دہندہ' : 'Verified Volunteer Blood Donor'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-sm font-bold text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Card Body (Printable/Downloadable style) */}
        <div className="p-5">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 via-slate-850 to-slate-950 p-5 border border-rose-500/30 shadow-inner">
            {/* Watermark Logo */}
            <div className="absolute right-3 top-3 opacity-10 text-7xl select-none pointer-events-none">
              🩸
            </div>

            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {regId}
                </span>
                <h4 className="text-xl font-black mt-2 text-white">{name}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <span>📍</span> {city} {donor.tehsil ? `(${donor.tehsil})` : ''}
                </p>
              </div>

              {/* Big Blood Badge */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-700 flex flex-col items-center justify-center shadow-lg border border-rose-400">
                <span className="text-[10px] uppercase font-bold text-rose-200">Group</span>
                <span className="text-2xl font-black tracking-tighter text-white">{bg}</span>
              </div>
            </div>

            {/* Donor Stats Grid */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/60 text-xs">
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/40">
                <span className="text-[10px] text-slate-400 block">
                  {lang === 'ur' ? 'عطیہ دینے کی حیثیت' : 'Donation Status'}
                </span>
                <span className="font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {lang === 'ur' ? 'دستیاب (Active)' : 'Available'}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/40">
                <span className="text-[10px] text-slate-400 block">
                  {lang === 'ur' ? 'رجسٹریشن پورٹل' : 'Portal'}
                </span>
                <span className="font-bold text-rose-300 mt-0.5 block truncate">
                  pak-blood-portal
                </span>
              </div>
            </div>

            {/* Motivational Slogan */}
            <p className="mt-3 text-center text-[10px] italic text-slate-400">
              "وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 space-y-2">
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all active:scale-[0.98]"
            >
              <span>💬</span>
              <span>
                {lang === 'ur'
                  ? 'واٹس ایپ اسٹیٹس پر شیئر کریں'
                  : 'Share on WhatsApp Status'}
              </span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-slate-300 transition-colors"
            >
              {lang === 'ur' ? 'بند کریں' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
