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
  const name = donor.name || 'ALLAH DITTA RABNAWAZ';
  const city = donor.city || 'Khanewal';
  const tehsil = donor.tehsil || 'Jahanian';
  const regId = `PK-BD-${(donor.id || Math.floor(100 + Math.random() * 900)).toString().slice(-3)}`;
  
  const today = new Date();
  const issueDate = today.toLocaleDateString('en-GB').replace(/\//g, '.');
  const expiryDate = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate())
    .toLocaleDateString('en-GB')
    .replace(/\//g, '.');

  const shareText = `🪪 *لائف سیور بلڈ ڈونر کارڈ (تصدیق شدہ)* 🇵🇰\n\n👤 *نام:* ${name}\n🩸 *بلڈ گروپ:* ${bg}\n📍 *شہر:* ${city} / ${tehsil}\n🆔 *کارڈ نمبر:* ${regId}\n✅ *حیثیت:* تصدیق شدہ لائف سیور (VERIFIED LIFE SAVER)\n\nخون کا عطیہ دیں، زندگیاں بچائیں۔ آپ بھی پاکستان بلڈ پورٹل پر اپنا کارڈ بنائیں:\n🔗 https://pak-blood-portal.vercel.app`;

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-sm sm:max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white my-auto">
        
        {/* Top Dialog Bar */}
        <div className="p-3 px-4 bg-slate-800 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪪</span>
            <span className="text-xs font-black tracking-tight text-emerald-400">
              {lang === 'ur' ? 'قومی لائف سیور اسمارٹ کارڈ' : 'Official Life Saver Donor Card'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-xs font-bold text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* ================= VERTICAL NADRA STYLE SMART CARD ================= */}
        <div className="p-4 sm:p-5 flex justify-center bg-slate-950">
          <div
            ref={cardRef}
            className="relative w-full max-w-[320px] rounded-3xl p-5 text-slate-900 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-emerald-600/40 flex flex-col justify-between select-none"
            style={{
              minHeight: '500px',
              background: 'linear-gradient(175deg, #cbeedb 0%, #bce7ce 18%, #d8f1e3 45%, #caebd7 75%, #b6e2c9 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 2px 4px rgba(255,255,255,0.8)'
            }}
          >
            {/* Guilloche fine security background patterns */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 30%, #059669 1px, transparent 1px), radial-gradient(circle at 20% 80%, #047857 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />

            {/* Subtle national crescent watermark in middle */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-9xl font-black">
              🇵🇰
            </div>

            {/* CARD HEADER SECTION */}
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3">
                {/* Pakistan State Emblem Coat of Arms */}
                <div className="w-11 h-11 rounded-full border border-emerald-900/40 bg-emerald-900/10 flex flex-col items-center justify-center p-1 shadow-sm">
                  <span className="text-[9px] leading-none">🇵🇰</span>
                  <div className="text-[7px] font-black text-emerald-950 tracking-tighter mt-0.5">
                    حکومت پاکستان
                  </div>
                </div>

                {/* Urdu Main Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-emerald-950 font-serif leading-none tracking-tight">
                    حکومتِ پاکستان
                  </h3>
                  <h4 className="text-base sm:text-lg font-black text-emerald-900 font-serif leading-tight mt-0.5">
                    لائف سیور بلڈ ڈونر کارڈ
                  </h4>
                </div>
              </div>

              {/* Sub-ribbon Banner */}
              <div className="mt-2.5 mx-auto max-w-[240px] py-0.5 px-2 rounded-full bg-emerald-900 text-white text-[9px] font-black tracking-widest uppercase shadow-sm">
                LIFE SAVER BLOOD DONOR CARD
              </div>
            </div>

            {/* MIDDLE SECTION: PHOTO REPLACED BY BLOOD GROUP EMBLEM + HOLOGRAM */}
            <div className="relative z-10 my-4 flex items-center justify-center gap-4">
              
              {/* PHOTO FRAME REPLACED WITH PROMINENT BLOOD GROUP EMBLEM */}
              <div className="relative w-28 h-32 rounded-2xl bg-gradient-to-b from-white to-slate-100 border-2 border-emerald-900/40 shadow-md p-2 flex flex-col items-center justify-center overflow-hidden">
                {/* Background Blood Drops pattern */}
                <div className="absolute top-1 right-2 text-rose-300/40 text-xl font-black">🩸</div>
                <div className="absolute bottom-1 left-2 text-rose-300/40 text-lg font-black">🩸</div>
                
                {/* Blood Drop Icon */}
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center text-xl shadow-inner mb-1">
                  🩸
                </div>
                
                {/* Blood Group Large */}
                <span className="text-3xl font-black text-rose-700 tracking-tighter leading-none">
                  {bg}
                </span>
                <span className="text-[8px] font-extrabold uppercase tracking-wider text-rose-950 mt-1">
                  BLOOD GROUP
                </span>
              </div>

              {/* SECURITY HOLOGRAM STICKER (Like CNIC) */}
              <div className="relative w-14 h-14 rounded-xl border border-emerald-500/60 shadow-md overflow-hidden flex flex-col items-center justify-center p-1 text-center"
                   style={{
                     background: 'linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 30%, #34d399 50%, #93c5fd 80%, #c4b5fd 100%)'
                   }}>
                <span className="text-sm">🇵🇰</span>
                <span className="text-[6px] font-black text-emerald-950 uppercase tracking-tighter leading-none mt-0.5">
                  LIFE SAVER
                </span>
                <span className="text-[5px] font-extrabold text-emerald-900 leading-none">
                  OFFICIAL SEAL
                </span>
              </div>

            </div>

            {/* CARD DETAILS LIST (Matches the exact layout of the reference photo) */}
            <div className="relative z-10 space-y-1.5 text-[11px] font-bold text-emerald-950 px-1">
              
              {/* Name */}
              <div className="flex items-center justify-between border-b border-emerald-900/15 pb-0.5">
                <span className="text-[10px] text-emerald-900/70 font-semibold">نام :</span>
                <span className="text-xs font-black uppercase text-emerald-950 tracking-tight text-right">
                  {name}
                </span>
              </div>

              {/* Blood Group */}
              <div className="flex items-center justify-between border-b border-emerald-900/15 pb-0.5">
                <span className="text-[10px] text-emerald-900/70 font-semibold">بلڈ گروپ :</span>
                <span className="text-xs font-black text-rose-700 font-mono tracking-wide text-right">
                  {bg}
                </span>
              </div>

              {/* Card Number */}
              <div className="flex items-center justify-between border-b border-emerald-900/15 pb-0.5">
                <span className="text-[10px] text-emerald-900/70 font-semibold">کارڈ نمبر :</span>
                <span className="font-mono text-xs font-black text-emerald-950 text-right">
                  {regId}
                </span>
              </div>

              {/* City / Tehsil */}
              <div className="flex items-center justify-between border-b border-emerald-900/15 pb-0.5">
                <span className="text-[10px] text-emerald-900/70 font-semibold">شہر / تحصیل :</span>
                <span className="text-[11px] font-black text-emerald-950 text-right">
                  {city} {tehsil ? ` / ${tehsil}` : ''}
                </span>
              </div>

              {/* Date of Issue */}
              <div className="flex items-center justify-between border-b border-emerald-900/15 pb-0.5">
                <span className="text-[10px] text-emerald-900/70 font-semibold">اجراء کی تاریخ :</span>
                <span className="font-mono text-[11px] font-bold text-emerald-950 text-right">
                  {issueDate}
                </span>
              </div>

              {/* Expiry / Validity */}
              <div className="flex items-center justify-between border-b border-emerald-900/15 pb-0.5">
                <span className="text-[10px] text-emerald-900/70 font-semibold">میعاد :</span>
                <span className="font-mono text-[11px] font-bold text-emerald-950 text-right">
                  {expiryDate}
                </span>
              </div>

              {/* Status */}
              <div className="pt-1 text-center">
                <div className="text-[10px] text-emerald-900/80 font-bold">
                  حیثیت: <span className="text-xs font-black text-emerald-950">تصدیق شدہ لائف سیور</span>
                </div>
                <div className="text-[9px] font-black tracking-widest uppercase text-emerald-900">
                  VERIFIED LIFE SAVER
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all active:scale-[0.98]"
          >
            <span>💬</span>
            <span>
              {lang === 'ur'
                ? 'واٹس ایپ اسٹیٹس پر شیئر کریں'
                : 'Share Card on WhatsApp'}
            </span>
          </button>

          <p className="text-center text-[10px] text-slate-400">
            {lang === 'ur'
              ? '📸 اسکرین شاٹ لے کر محفوظ کر لیں یا واٹس ایپ پر لگائیں!'
              : 'Take a screenshot to save as your verified card!'}
          </p>
        </div>

      </div>
    </div>
  );
};
