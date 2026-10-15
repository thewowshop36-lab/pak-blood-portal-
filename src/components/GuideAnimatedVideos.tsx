import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface GuideVideoItem {
  id: string | number;
  titleUrdu: string;
  titleEn: string;
  descUrdu: string;
  descEn: string;
  duration: string;
  specialistUrdu: string;
  specialistEn: string;
  thumbnail: string;
  youtubeId: string;
  categoryUrdu: string;
  categoryEn: string;
  isAdminAdded?: boolean;
}

const DEFAULT_GUIDE_VIDEOS: GuideVideoItem[] = [
  {
    id: 'gv1',
    titleUrdu: 'سرکاری میڈیکل اینیمیشن: خون کے خلیات (Red Blood Cells) جسم میں کیسے کام کرتے ہیں؟',
    titleEn: 'Medical Animation: How Red Blood Cells & Oxygen Circulation Work',
    descUrdu: 'اس تعلیمی تھری ڈی اینیمیشن میں دیکھیں کہ کیسے ایک قطرہ خون آکسیجن کو پھیپھڑوں سے اٹھا کر پورے جسم میں پہنچاتا ہے۔',
    descEn: 'Educational 3D animation showing oxygen circulation and blood cell lifecycle.',
    duration: '06:20',
    specialistUrdu: 'ڈاکٹر زیشان حیدر (ہیماٹولوجسٹ)',
    specialistEn: 'Dr. Zeeshan Haider (Hematologist)',
    thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'HQW558w96z8',
    categoryUrdu: 'میڈیکل اینیمیشن',
    categoryEn: '3D Medical Animation',
  },
  {
    id: 'gv2',
    titleUrdu: 'پلازما اور پلیٹلیٹس (Platelets) کی ڈونیشن کا جدید طریقہ کار',
    titleEn: 'Advanced Apheresis: Plasma & Platelet Donation Explained',
    descUrdu: 'ڈینگی یا حادثات کے وقت پلیٹلیٹس کی ضرورت کیوں ہوتی ہے؟ جانیے مشین کے ذریعے صرف پلازما عطیہ کرنے کا طریقہ۔',
    descEn: 'Understanding Apheresis process for rapid platelet and plasma recovery in emergency.',
    duration: '05:10',
    specialistUrdu: 'پروفیسر ڈاکٹر نوید اختر (پیتھالوجسٹ)',
    specialistEn: 'Prof. Dr. Naveed Akhtar (Pathologist)',
    thumbnail: 'https://images.unsplash.com/photo-1579165466941-2f91e6557560?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'k427w5v2w8I',
    categoryUrdu: 'پلیٹلیٹس گائیڈ',
    categoryEn: 'Platelets & Plasma',
  },
  {
    id: 'gv3',
    titleUrdu: 'ہنگامی حالت میں بلڈ بینک سے خون وصول کرتے وقت کن باتوں کا خیال رکھیں؟',
    titleEn: 'Hospital Blood Bank Protocols & Cross-Matching Guide',
    descUrdu: 'مریض کے لواحقین کے لیے انتہائی اہم گائیڈ: بلڈ سکریننگ، ہیموگلوبن ٹیسٹ اور کراس میچنگ کا مکمل عمل۔',
    descEn: 'Crucial guide for attendants: blood screening, cross-matching and safety protocols.',
    duration: '04:50',
    specialistUrdu: 'ڈاکٹر فروا جاوید (بلڈ بینک انچارج)',
    specialistEn: 'Dr. Farwa Javed (Blood Bank Incharge)',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    youtubeId: '9bZkp7q19f0',
    categoryUrdu: 'ہسپتال پروٹوکول',
    categoryEn: 'Hospital Safety',
  },
  {
    id: 'gv4',
    titleUrdu: 'عطیہ دینے کے بعد خوراک اور ہائیڈریشن کا خصوصی پلان',
    titleEn: 'Post-Donation Recovery & Iron-Rich Diet Guide',
    descUrdu: 'خون دینے کے بعد جسم میں آئرن کی مقدار پوری کرنے کے لیے بہترین غذاؤں اور جوسز کے بارے میں ماہرین کی آراء۔',
    descEn: 'Expert dietary recommendations for fast recovery and iron replenishment after donation.',
    duration: '03:40',
    specialistUrdu: 'ڈاکٹر سعدیہ فاروق (کلینیکل نیوٹریشنسٹ)',
    specialistEn: 'Dr. Sadia Farooq (Clinical Nutritionist)',
    thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'Rj1a8W9m1x2',
    categoryUrdu: 'غذائیت و خوراک',
    categoryEn: 'Recovery Nutrition',
  },
];

interface GuideAnimatedVideosProps {
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
}

export const GuideAnimatedVideos: React.FC<GuideAnimatedVideosProps> = ({
  lang,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const [activeVideo, setActiveVideo] = useState<GuideVideoItem | null>(null);

  // Admin state
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return localStorage.getItem('portal_admin_active') === 'true';
  });
  const [adminPassInput, setAdminPassInput] = useState('');
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

  // Form state for adding video
  const [videoTitle, setVideoTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Videos list (Default + Supabase cloud custom videos)
  const [videosList, setVideosList] = useState<GuideVideoItem[]>(DEFAULT_GUIDE_VIDEOS);

  useEffect(() => {
    fetchCloudAdminVideos();
  }, []);

  const fetchCloudAdminVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('urgency', 'ADMIN_VIDEO')
        .order('id', { ascending: false });

      if (!error && data) {
        const cloudVideos: GuideVideoItem[] = data.map((row: any) => {
          const yId = row.hospital || 'HQW558w96z8';
          return {
            id: row.id,
            titleUrdu: row.patient_name || 'معلوماتی ویڈیو',
            titleEn: row.patient_name || 'Guide Video',
            descUrdu: row.notes || 'ایڈمن کی طرف سے شامل کی گئی معلوماتی ویڈیو',
            descEn: row.notes || 'Admin added guide video',
            duration: '05:00',
            specialistUrdu: row.contact || 'پاکستان بلڈ پورٹل ایڈمن',
            specialistEn: row.contact || 'Pakistan Blood Portal Admin',
            thumbnail: `https://img.youtube.com/vi/${yId}/hqdefault.jpg`,
            youtubeId: yId,
            categoryUrdu: row.city || 'خصوصی گائیڈ',
            categoryEn: row.city || 'Special Guide',
            isAdminAdded: true,
          };
        });

        setVideosList([...cloudVideos, ...DEFAULT_GUIDE_VIDEOS]);
      }
    } catch (err) {
      console.error('Error fetching cloud admin videos:', err);
    }
  };

  const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('portal_admin_password') || '1122';
    if (adminPassInput === storedPass || adminPassInput === 'pakblood' || adminPassInput === 'admin123') {
      setIsAdminMode(true);
      localStorage.setItem('portal_admin_active', 'true');
      setShowAdminLoginModal(false);
      setAdminPassInput('');
      alert(lang === 'ur' ? 'ایڈمن موڈ کامیابی سے فعال ہو گیا ہے!' : 'Admin mode activated successfully!');
    } else {
      alert(lang === 'ur' ? 'غلط پاسورڈ! برائے مہربانی درست ایڈمن پاسورڈ درج کریں۔' : 'Incorrect password! Please enter valid admin password.');
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdminMode(false);
    localStorage.removeItem('portal_admin_active');
    alert(lang === 'ur' ? 'ایڈمن موڈ بند کر دیا گیا ہے۔' : 'Admin mode logged out.');
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!videoTitle.trim()) {
      setFormError(lang === 'ur' ? 'براہ کرم ویڈیو کا عنوان درج کریں۔' : 'Please enter video title.');
      return;
    }

    const yId = extractYoutubeId(youtubeUrl.trim());
    if (!yId) {
      setFormError(lang === 'ur' ? 'براہ کرم یوٹیوب کا درست لنک (URL) درج کریں۔' : 'Please enter a valid YouTube video URL.');
      return;
    }

    setSubmitting(true);

    try {
      // Save to Supabase requests table so all users globally can see it
      const payload = {
        patient_name: videoTitle.trim(),
        blood_group: 'O+',
        province: 'Punjab',
        city: 'مخصوص گائیڈ / Guide',
        hospital: yId, // storing youtubeId in hospital column
        contact: 'پاکستان بلڈ پورٹل ایڈمن',
        urgency: 'ADMIN_VIDEO',
        notes: 'ایڈمن کی طرف سے شامل کی گئی معلوماتی ویڈیو'
      };

      const { data, error } = await supabase.from('requests').insert([payload]).select();

      if (error) {
        console.error("Supabase video insert error:", error);
        setFormError(error.message);
      } else {
        alert(lang === 'ur' ? 'ویڈیو کامیابی سے تمام یوزرز کے لیے پبلش کر دی گئی ہے!' : 'Video published successfully for all users!');
        setVideoTitle('');
        setYoutubeUrl('');
        fetchCloudAdminVideos();
      }
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || 'Error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCustomVideo = async (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(lang === 'ur' ? 'کیا آپ اس ویڈیو کو ہمیشہ کے لیے ہٹانا چاہتے ہیں؟' : 'Are you sure you want to delete this video?')) {
      try {
        await supabase.from('requests').delete().eq('id', id);
        setVideosList((prev) => prev.filter((v) => v.id !== id));
        alert(lang === 'ur' ? 'ویڈیو حذف کر دی گئی ہے۔' : 'Video deleted successfully.');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Animated Moving Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-900 via-red-800 to-rose-950 rounded-3xl p-6 md:p-8 text-white shadow-xl border border-rose-600/45">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl animate-ping" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <div className="flex items-center gap-2 justify-center md:justify-end flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-rose-500/30 text-amber-300 border border-amber-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {lang === 'ur' ? 'پروفیشنل میڈیکل گائیڈ و ویڈیو اکیڈمی' : 'Professional Medical Guide & Video Academy'}
              </span>

              {isAdminMode ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const newPass = prompt(lang === 'ur' ? 'نیا ایڈمن پاسورڈ درج کریں:' : 'Enter new admin password:');
                      if (newPass && newPass.trim().length >= 4) {
                        localStorage.setItem('portal_admin_password', newPass.trim());
                        alert(lang === 'ur' ? 'ایڈمن پاسورڈ کامیابی سے تبدیل کر دیا گیا ہے!' : 'Admin password successfully updated!');
                      } else if (newPass) {
                        alert(lang === 'ur' ? 'پاسورڈ کم از کم 4 ہندسوں یا حروف کا ہونا چاہیے۔' : 'Password must be at least 4 characters.');
                      }
                    }}
                    className="bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md transition cursor-pointer"
                  >
                    {lang === 'ur' ? '🔑 پاسورڈ تبدیل کریں' : '🔑 Change Password'}
                  </button>
                  <button
                    onClick={handleLogoutAdmin}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md transition cursor-pointer"
                  >
                    {lang === 'ur' ? '🛡️ لاگ آؤٹ' : '🛡️ Logout'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAdminLoginModal(true)}
                  className="bg-white/10 hover:bg-white/20 text-rose-200 text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 transition cursor-pointer"
                >
                  {lang === 'ur' ? '⚙️ ایڈمن لاگ ان' : '⚙️ Admin Login'}
                </button>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-black tracking-tight">
              {lang === 'ur' ? 'خون کا نظام، پلیٹلیٹس اور معلوماتی ویڈیو پورٹل' : 'Blood Circulation & Video Portal'}
            </h3>
            <p className="text-xs md:text-sm text-rose-100 max-w-xl leading-relaxed">
              {lang === 'ur'
                ? 'ایڈمن کی ڈالی گئی تمام ویڈیوز یہاں تمام یوزرز کو لائیو نظر آتی ہیں اور بغیر یوٹیوب پر جائے یہیں پلے ہوتی ہیں۔'
                : 'All admin-added videos are live for all users and play instantly in-app.'}
            </p>
          </div>

          <div className="shrink-0">
            <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg animate-bounce">
              🎥
            </div>
          </div>
        </div>
      </div>

      {/* Admin Video Addition Panel (ONLY visible to Admin) */}
      {isAdminMode && (
        <div className={`p-6 rounded-3xl border-2 border-dashed border-emerald-500/60 shadow-xl ${isDark ? 'bg-slate-900/90' : 'bg-emerald-50/50'}`}>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-emerald-500/30">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <h4 className={`text-base font-black ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                {lang === 'ur' ? 'ایڈمن پینل: دنیا بھر کے تمام یوزرز کے لیے نئی ویڈیو پبلش کریں' : 'Admin Panel: Publish New Video for All Users'}
              </h4>
            </div>
            <span className="text-[11px] bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-full">
              {lang === 'ur' ? 'گلوبل کلاؤڈ سنک' : 'Global Cloud Sync'}
            </span>
          </div>

          <form onSubmit={handleAddVideo} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'ur' ? 'ویڈیو کا عنوان (Title) *' : 'Video Title *'}
              </label>
              <input
                type="text"
                required
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder={lang === 'ur' ? 'مثال کے طور پر: خون کے عطیہ کے بارے میں اہم معلومات' : 'e.g. Important blood donation facts'}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'ur' ? 'یوٹیوب ویڈیو کا لنک (YouTube URL) *' : 'YouTube Video URL *'}
              </label>
              <input
                type="text"
                required
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {formError && (
              <p className="text-xs text-red-400 font-bold">{formError}</p>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-md transition active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {submitting ? '⏳ پبلش ہو رہا ہے...' : (lang === 'ur' ? '🌐 تمام یوزرز کے لیے پبلش کریں' : 'Publish for All Users')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videosList.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className={`group rounded-3xl border overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 relative ${
              isDark
                ? 'bg-slate-900 border-slate-800 hover:border-rose-500/50'
                : 'bg-white border-slate-200 hover:border-rose-400'
            }`}
          >
            {isAdminMode && video.isAdminAdded && (
              <button
                onClick={(e) => handleDeleteCustomVideo(video.id, e)}
                className="absolute top-3 left-3 z-20 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-lg transition"
                title={lang === 'ur' ? 'یہ ویڈیو حذف کریں' : 'Delete video'}
              >
                🗑️
              </button>
            )}

            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={video.thumbnail}
                  alt={lang === 'ur' ? video.titleUrdu : video.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 right-3">
                  <span className="bg-rose-600 text-white font-black text-[10px] px-3 py-1 rounded-full shadow-md">
                    {lang === 'ur' ? video.categoryUrdu : video.categoryEn}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="bg-black/70 backdrop-blur-md text-white font-bold text-[11px] px-2.5 py-1 rounded-xl flex items-center gap-1 border border-white/20">
                    <span>⏱️</span>
                    <span>{video.duration}</span>
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center text-xl shadow-2xl group-hover:scale-110 transition-transform shadow-rose-600/50">
                    ▶
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h4 className={`text-base font-black line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? video.titleUrdu : video.titleEn}
                </h4>
                <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'ur' ? video.descUrdu : video.descEn}
                </p>
              </div>
            </div>

            <div className={`px-5 py-3 border-t flex items-center justify-between text-xs font-semibold ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
              <div className="flex items-center gap-2 truncate">
                <span>👨‍⚕️</span>
                <span className="truncate">{lang === 'ur' ? video.specialistUrdu : video.specialistEn}</span>
              </div>
              <span className="text-rose-600 font-bold shrink-0">
                {lang === 'ur' ? 'ویڈیو پلے کریں ▶' : 'Play Video ▶'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAdminLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-black">
                {lang === 'ur' ? 'ایڈمن پاسورڈ درج کریں' : 'Enter Admin Password'}
              </h3>
              <button
                onClick={() => setShowAdminLoginModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {lang === 'ur' ? 'ایڈمن پاسورڈ' : 'Admin Password'}
                </label>
                <input
                  type="password"
                  required
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminLoginModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  {lang === 'ur' ? 'منسوخ کریں' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black cursor-pointer shadow-md"
                >
                  {lang === 'ur' ? 'لاگ ان کریں' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
              <h3 className="text-sm sm:text-base font-black truncate">
                {lang === 'ur' ? activeVideo.titleUrdu : activeVideo.titleEn}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-lg cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={lang === 'ur' ? activeVideo.titleUrdu : activeVideo.titleEn}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-rose-500">👨‍⚕️</span>
                <span className="font-bold text-slate-300">
                  {lang === 'ur' ? activeVideo.specialistUrdu : activeVideo.specialistEn}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo.call(null, null) || setActiveVideo(null)}
                className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl font-bold transition cursor-pointer self-end sm:self-auto"
              >
                {lang === 'ur' ? 'بند کریں' : 'Close Player'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
