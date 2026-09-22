import React, { useState, useEffect } from 'react';

interface PollOption {
  id: string;
  textUrdu: string;
  textEn: string;
  icon: string;
  votes: number;
}

export const CommunityPollVote: React.FC<{ lang: 'ur' | 'en'; theme?: 'light' | 'dark' }> = ({ lang, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const [options, setOptions] = useState<PollOption[]>([
    {
      id: 'pledge',
      textUrdu: 'ہاں! میں ایمرجنسی میں خون کا عطیہ دینے کا عہد کرتا ہوں ❤️',
      textEn: 'Yes! I pledge to donate blood in emergency ❤️',
      icon: '🩸',
      votes: 1248,
    },
    {
      id: 'already_donated',
      textUrdu: 'میں پہلے بھی خون کا عطیہ دے چکا ہوں اور دوبارہ بھی دوں گا 🏅',
      textEn: 'I have already donated blood and will donate again 🏅',
      icon: '🙌',
      votes: 894,
    },
    {
      id: 'praying',
      textUrdu: 'میں تمام مریضوں کی صحتیابی اور ڈونرز کے لیے دعا گو ہوں 🤲',
      textEn: 'I pray for all patients and support this noble cause 🤲',
      icon: '✨',
      votes: 1672,
    },
  ]);

  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user_has_voted_blood_poll');
    if (saved) {
      setHasVoted(true);
      setVotedOptionId(saved);
    }
  }, []);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (id: string) => {
    if (hasVoted) return;

    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );
    setHasVoted(true);
    setVotedOptionId(id);
    setShowCelebration(true);
    localStorage.setItem('user_has_voted_blood_poll', id);

    setTimeout(() => {
      setShowCelebration(false);
    }, 4000);
  };

  return (
    <div className={`relative overflow-hidden border rounded-3xl p-6 sm:p-8 mb-8 ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-slate-800 text-slate-100 shadow-2xl'
        : 'bg-white border-slate-200/90 text-slate-800 shadow-md'
    }`}>
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-700 flex items-center justify-center text-2xl shadow-lg shadow-rose-600/30">
            🗳️
          </div>
          <div>
            <span className="text-rose-600 font-extrabold text-[11px] uppercase tracking-wider block">
              {lang === 'ur' ? 'عوامی رائے دہی و عہد نامہ' : 'Community Vote & Pledge'}
            </span>
            <h3 className={`text-base sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ur' ? 'کیا آپ انسانیت کی خاطر خون کا عطیہ دینے کے لیے تیار ہیں؟' : 'Are you ready to pledge blood donation for humanity?'}
            </h3>
          </div>
        </div>

        <div className={`border px-4 py-2 rounded-2xl text-center shrink-0 ${
          isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <span className="text-lg font-black text-rose-600">{totalVotes.toLocaleString()}</span>
          <span className={`text-[11px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {lang === 'ur' ? 'کل موصولہ ووٹ' : 'Total Votes'}
          </span>
        </div>
      </div>

      {showCelebration && (
        <div className={`mt-4 p-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-bounce border ${
          isDark ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-800'
        }`}>
          <span className="text-lg">🎉</span>
          <span>{lang === 'ur' ? 'آپ کا ووٹ کامیابی سے درج ہو گیا ہے! اللہ پاک آپ کے اس نیک جذبے کو قبول فرمائے۔ جزاک اللہ!' : 'Thank you! Your pledge vote has been recorded successfully.'}</span>
        </div>
      )}

      <div className="mt-6 space-y-3.5">
        {options.map((opt) => {
          const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          const isSelected = votedOptionId === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => !hasVoted && handleVote(opt.id)}
              className={`relative overflow-hidden p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? isDark
                    ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/50 shadow-lg'
                    : 'bg-rose-50 border-rose-500 ring-2 ring-rose-400 shadow-md'
                  : hasVoted
                  ? isDark ? 'bg-slate-950/60 border-slate-850 cursor-default' : 'bg-slate-50/80 border-slate-200 cursor-default'
                  : isDark
                  ? 'bg-slate-950/80 border-slate-800 hover:border-rose-500/60 hover:bg-slate-900 active:scale-[0.99]'
                  : 'bg-slate-50 hover:bg-rose-50/40 border-slate-200 hover:border-rose-400 active:scale-[0.99] shadow-2xs'
              }`}
            >
              {hasVoted && (
                <div
                  className={`absolute inset-y-0 right-0 opacity-15 pointer-events-none transition-all duration-700 rounded-2xl ${
                    isSelected ? 'bg-rose-600' : isDark ? 'bg-slate-600' : 'bg-slate-400'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`text-2xl p-2 rounded-xl border ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    {opt.icon}
                  </span>
                  <div>
                    <h5 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'ur' ? opt.textUrdu : opt.textEn}
                    </h5>
                    {hasVoted && (
                      <span className={`text-[11px] font-semibold mt-0.5 block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {opt.votes.toLocaleString()} {lang === 'ur' ? 'لوگوں نے ووٹ دیا' : 'votes'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {hasVoted ? (
                    <span className={`text-base font-black px-3 py-1 rounded-xl ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow'
                        : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {percent}%
                    </span>
                  ) : (
                    <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md shadow-rose-600/30 transition cursor-pointer">
                      {lang === 'ur' ? 'ووٹ دیں' : 'Vote'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {lang === 'ur'
            ? 'خون کا عطیہ ایک صدقہ جاریہ ہے۔ آپ کی ایک رائے اور حمایت کسی انسان کی جان بچانے کا سبب بن سکتی ہے۔'
            : 'Blood donation is an ongoing charity. Your support encourages life-saving donors.'}
        </p>
      </div>
    </div>
  );
};
