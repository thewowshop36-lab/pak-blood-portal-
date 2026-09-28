import React, { useRef } from 'react';
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

  const cardRef = useRef<HTMLDivElement>(null);
  const bg = donor.blood_group || donor.bloodgroup || donor.bloodGroup || 'O+';
  const name = donor.name || 'محترم ڈونر';
  const city = donor.city || 'پاکستان';
  const tehsil = donor.tehsil || '';
  const phone = donor.phone || donor.contact || donor.whatsapp_number || '03XX-XXXXXXX';
  const regId = `PK-BD-${(donor.id || Math.floor(1000 + Math.random() * 9000)).toString().slice(-4)}`;
  const issueDate = new Date().toLocaleDateString('en-GB');

  const shareText = `🪪 *سرکاری لائف سیور شناختی کارڈ (تصدیق شدہ)* 🇵🇰\n\n👤 *نام:* ${name}\n🩸 *بلڈ گروپ:* ${bg}\n📍 *شہر:* ${city} ${tehsil ? `(${tehsil})` : ''}\n🆔 *کارڈ نمبر:* ${regId}\n✅ *حیثیت:* تصدیق شدہ بلڈ ڈونر\n\nمیں نے پاکستان بلڈ پورٹل پر بطور تصدیق شدہ ڈونر رجسٹریشن کروا لی ہے۔ آپ بھی رجسٹر ہوں:\n🔗 https://pak-blood-portal.vercel.app`;

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl text-white my-auto">
        
        {/* Top Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 flex items-center justify-between border-b border-emerald-600/40">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇵🇰</span>
            <div>
              <h3 className="text-sm font-black tracking-tight text-emerald-100">
                {lang === 'ur' ? 'قومی لائف سیور اسمارٹ شناختی کارڈ' : 'National Life-Saver Smart ID'}
              </h3>
              <p className="text-[10px] text-emerald-300">
                {lang === 'ur' ? 'تصدیق شدہ رضاکار بلڈ ڈونر نیٹ ورک' : 'Certified Voluntary Blood Donor'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* ================= PHYSICAL SMART CARD DESIGN ================= */}
        <div className="p-4 sm:p-5 flex justify-center">
          <div
            ref={cardRef}
            className="relative w-full aspect-[1.58/1] rounded-2xl p-4 sm:p-5 text-slate-900 overflow-hidden shadow-2xl border-2 border-emerald-600/50 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #e2e8f0 40%, #dcfce7 70%, #f8fafc 100%)',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
            }}
          >
            {/* Subtle Guilloche Security Pattern / Watermark */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center select-none text-9xl font-black">
              🇵🇰
            </div>
            
            {/* CARD TOP BAR */}
            <div className="flex items-center justify-between border-b border-emerald-700/30 pb-2 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white text-sm shadow-md font-bold">
                  🇵🇰
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-emerald-900 leading-tight">
                    PAKISTAN BLOOD DONOR PORTAL
                  </h4>
                  <p className="text-[9px] font-bold text-emerald-700">
                    پاکستان رضاکار لائف سیور شناختی کارڈ
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono font-bold bg-emerald-900 text-white px-2 py-0.5 rounded-md shadow-sm">
                  {regId}
                </span>
              </div>
            </div>

            {/* CARD MIDDLE BODY */}
            <div className="grid grid-cols-12 gap-3 items-center my-auto py-2 relative z-10">
              
              {/* Left Column: Chip & Donor Photo */}
              <div className="col-span-4 flex flex-col items-center gap-1.5">
                {/* Gold Smart Chip */}
                <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 border border-amber-600/60 shadow-inner flex flex-col justify-around p-1">
                  <div className="w-full h-[1px] bg-amber-700/40"></div>
                  <div className="w-full h-[1px] bg-amber-700/40"></div>
                </div>

                {/* Donor Photo Frame */}
                <div className="w-16 h-18 sm:w-18 sm:h-20 rounded-xl bg-white border-2 border-emerald-800/40 shadow-md overflow-hidden flex items-center justify-center text-3xl">
                  {donor.photo_url ? (
                    <img src={donor.photo_url} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span>👤</span>
                  )}
                </div>
              </div>

              {/* Middle Column: Details */}
              <div className="col-span-5 flex flex-col justify-center space-y-1 text-left pl-1">
                <div>
                  <span className="text-[8px] font-bold text-slate-500 block uppercase">Name / نام</span>
                  <span className="text-sm font-black text-slate-900 tracking-tight leading-none block truncate">
                    {name}
                  </span>
                </div>

                <div>
                  <span className="text-[8px] font-bold text-slate-500 block uppercase">City / ضلع و تحصیل</span>
                  <span className="text-[11px] font-bold text-slate-800 block truncate">
                    {city} {tehsil ? `• ${tehsil}` : ''}
                  </span>
                </div>

                <div>
                  <span className="text-[8px] font-bold text-slate-500 block uppercase">Emergency Contact / رابطہ</span>
                  <span className="text-[10px] font-mono font-bold text-slate-700 block">
                    {phone.slice(0, 4)} - {phone.slice(4)}
                  </span>
                </div>
              </div>

              {/* Right Column: Blood Group Badge & Stamp */}
              <div className="col-span-3 flex flex-col items-center justify-center relative">
                {/* Blood Group Shield */}
                <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white flex flex-col items-center justify-center shadow-lg border border-rose-400">
                  <span className="text-[8px] font-bold tracking-wider uppercase text-rose-200">Group</span>
                  <span className="text-2xl font-black tracking-tight leading-none my-0.5">{bg}</span>
                  <span className="text-[7px] font-semibold text-rose-200">POSITIVE</span>
                </div>
              </div>

            </div>

            {/* CARD BOTTOM BAR WITH OFFICIAL RED STAMP */}
            <div className="border-t border-emerald-700/20 pt-1.5 flex items-center justify-between text-[8px] relative z-10">
              <div>
                <span className="font-semibold text-slate-600">Issue: </span>
                <span className="font-mono font-bold text-slate-800">{issueDate}</span>
                <span className="mx-1 text-slate-400">|</span>
                <span className="font-bold text-emerald-700">100% رضاکارانہ</span>
              </div>

              {/* ================= REALISTIC CIRCULAR RED STAMP ================= */}
              <div className="absolute right-2 bottom-0 transform -rotate-12 pointer-events-none select-none">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-dashed border-red-600/90 flex flex-col items-center justify-center p-1 text-center bg-red-500/5 backdrop-blur-[0.5px] shadow-sm">
                  <div className="w-full h-full rounded-full border border-red-600/80 flex flex-col items-center justify-center">
                    <span className="text-[6px] font-black uppercase tracking-tighter text-red-700 leading-none">
                      PAK BLOOD PORTAL
                    </span>
                    <span className="text-[9px] font-black text-red-800 my-0.5">
                      ★ تصدیق شدہ ★
                    </span>
                    <span className="text-[6px] font-bold uppercase tracking-tight text-red-700 leading-none">
                      VERIFIED DONOR
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Actions Bottom Bar */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 space-y-2">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all active:scale-[0.98]"
          >
            <span>💬</span>
            <span>
              {lang === 'ur'
                ? 'واٹس ایپ پر یہ کارڈ شیئر کریں'
                : 'Share Verified Card on WhatsApp'}
            </span>
          </button>

          <p className="text-center text-[10px] text-slate-400">
            {lang === 'ur'
              ? '💡 موبائل پر کارڈ کا اسکرین شاٹ لے کر اسٹیٹس پر بھی لگا سکتے ہیں!'
              : 'Take a screenshot of this card to share on social media!'}
          </p>
        </div>

      </div>
    </div>
  );
};
