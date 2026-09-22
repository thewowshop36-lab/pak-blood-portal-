import React, { useState } from 'react';
import { Donor } from '../types';

interface DonorCardProps {
  donor: Donor;
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
}

const avatarImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
];

export const DonorCard: React.FC<DonorCardProps> = ({ donor, lang, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const blood = donor.bloodgroup || donor.bloodGroup || donor.blood_group || 'O+';
  const phoneVal = donor.phone || donor.contact || '';
  const cleanPhone = phoneVal.replace(/[^0-9]/g, '');
  
  let waNumber = cleanPhone;
  if (waNumber.startsWith('03')) {
    waNumber = '92' + waNumber.slice(1);
  } else if (!waNumber.startsWith('92') && waNumber.length === 10) {
    waNumber = '92' + waNumber;
  }

  const storageKey = `donor_votes_${donor.id || donor.name}`;
  const [votes, setVotes] = useState<number>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved, 10) : (Math.floor((donor.name.length * 7) % 35) + 12);
  });
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    return localStorage.getItem(`${storageKey}_voted`) === 'true';
  });
  const [voteAnimation, setVoteAnimation] = useState(false);

  const avatarUrl = donor.photo_url || avatarImages[Math.abs(donor.name.charCodeAt(0)) % avatarImages.length];

  const handleVoteForDonor = () => {
    if (hasVoted) return;
    const newVotes = votes + 1;
    setVotes(newVotes);
    setHasVoted(true);
    setVoteAnimation(true);
    localStorage.setItem(storageKey, newVotes.toString());
    localStorage.setItem(`${storageKey}_voted`, 'true');
    setTimeout(() => setVoteAnimation(false), 2000);
  };

  const waMessage = encodeURIComponent(
    `السلام علیکم ${donor.name} بھائی! مجھے پاکستان بلڈ پورٹل سے آپ کا رابطہ ملا ہے۔ ہمیں مریض کے لیے فوری بلڈ گروپ (${blood}) کی اشد ضرورت ہے۔ کیا آپ اس وقت خون کا عطیہ دینے کے لیے دستیاب ہیں؟ مقام: ${donor.city}۔ جزاک اللہ!`
  );

  const handleShare = () => {
    const shareText = encodeURIComponent(
      `🩸 *دستیاب بلڈ ڈونر معلومات*\n👤 نام: ${donor.name}\n💉 بلڈ گروپ: ${blood}\n📍 شہر/علاقہ: ${donor.city} ${donor.tehsil ? '(' + donor.tehsil + ')' : ''}\n📞 رابطہ: ${phoneVal}\n\nپاکستان بلڈ پورٹل کے ذریعے تصدیق شدہ۔`
    );
    window.open(`https://wa.me/?text=${shareText}`, '_blank');
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group ${
      isDark
        ? 'bg-slate-900/90 border-slate-800 hover:border-rose-500/50 shadow-xl'
        : 'bg-white border-slate-200/90 hover:border-rose-400 shadow-sm hover:shadow-md'
    }`}>
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={avatarUrl}
                alt={donor.name}
                referrerPolicy="no-referrer"
                className={`w-13 h-13 rounded-2xl object-cover border-2 shadow-md group-hover:border-rose-500 transition ${
                  isDark ? 'border-slate-700' : 'border-slate-200'
                }`}
              />
              <span className="absolute -bottom-1 -right-1 bg-rose-600 text-white font-black text-[11px] px-1.5 py-0.5 rounded-lg border border-white shadow">
                {blood}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className={`font-extrabold text-base transition ${
                  isDark ? 'text-white group-hover:text-rose-300' : 'text-slate-900 group-hover:text-rose-600'
                }`}>
                  {donor.name}
                </h4>
                <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isDark
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {lang === 'ur' ? 'دستیاب' : 'Available'}
                </span>
              </div>

              <div className={`flex flex-wrap items-center gap-1.5 text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span className="text-rose-600 font-bold">📍 {donor.city}</span>
                {donor.tehsil && (
                  <span className={`px-2 py-0.5 rounded-md text-[11px] ${
                    isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {donor.tehsil}
                  </span>
                )}
                {donor.area && (
                  <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    • {donor.area}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            title={lang === 'ur' ? 'شیئر کریں' : 'Share'}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              isDark ? 'text-slate-500 hover:text-rose-400 hover:bg-slate-800' : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </button>
        </div>

        <div className={`flex items-center justify-between rounded-xl px-3 py-2 mb-3 border ${
          isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
        }`}>
          <div className="flex items-center gap-1.5 text-xs">
            <span>❤️</span>
            <span className="font-bold text-rose-600">{votes}</span>
            <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lang === 'ur' ? 'دعائیں اور ووٹ' : 'Prayers & Votes'}
            </span>
          </div>

          <button
            onClick={handleVoteForDonor}
            disabled={hasVoted}
            className={`text-xs font-bold px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
              hasVoted
                ? isDark ? 'bg-rose-500/20 text-rose-300 cursor-default' : 'bg-rose-100 text-rose-700 cursor-default'
                : isDark
                ? 'bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 active:scale-95'
                : 'bg-white hover:bg-rose-600 hover:text-white text-slate-700 border border-slate-200 active:scale-95 shadow-2xs'
            }`}
          >
            <span>{hasVoted ? '✓ دعا دی گئی' : '🤲 دعا / ووٹ دیں'}</span>
            {voteAnimation && <span className="animate-ping text-rose-500">❤️</span>}
          </button>
        </div>

        {donor.hospital_near && (
          <div className={`mb-3 text-xs px-3 py-1.5 rounded-xl flex items-center gap-2 border ${
            isDark ? 'bg-slate-950/60 border-slate-800/60 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <span>🏥</span>
            <span className="truncate">{donor.hospital_near}</span>
          </div>
        )}
      </div>

      <div className={`pt-3 border-t grid grid-cols-2 gap-2 mt-2 ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
        <a
          href={`https://wa.me/${waNumber}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 border ${
            isDark
              ? 'bg-emerald-600/15 hover:bg-emerald-600 text-emerald-400 hover:text-white border-emerald-500/30'
              : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border-emerald-300'
          }`}
        >
          <span className="text-sm">💬</span>
          <span>{lang === 'ur' ? 'واٹس ایپ رابطہ' : 'WhatsApp'}</span>
        </a>

        <a
          href={`tel:${phoneVal}`}
          className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md shadow-rose-600/20"
        >
          <span className="text-sm">📞</span>
          <span>{lang === 'ur' ? 'کال کریں' : 'Call'}</span>
        </a>
      </div>
    </div>
  );
};
