import React, { useState } from 'react';
import { pakistanProvinces, cityTehsils } from '../data/pakistanLocations';
import { supabase } from '../lib/supabase';
import { Donor } from '../types';

interface RegisterDonorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProvince?: string;
  defaultCity?: string;
  onDonorRegistered: (newDonor: Donor) => void;
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
}

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const RegisterDonorModal: React.FC<RegisterDonorModalProps> = ({
  isOpen,
  onClose,
  defaultProvince,
  defaultCity,
  onDonorRegistered,
  lang,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const initialProvince = defaultProvince || Object.keys(pakistanProvinces)[0];
  const initialCity = defaultCity || pakistanProvinces[initialProvince][0];

  const [province, setProvince] = useState(initialProvince);
  const [city, setCity] = useState(initialCity);
  const [tehsil, setTehsil] = useState('');
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentTehsils = cityTehsils[city] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg(lang === 'ur' ? 'براہ کرم اپنا نام درج کریں۔' : 'Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg(lang === 'ur' ? 'درست موبائل نمبر درج کریں (مثال: 03001234567)' : 'Please enter a valid mobile number.');
      return;
    }

    setLoading(true);
    try {
      // Supabase donors table schema: name, bloodgroup, province, city, phone
      const donorPayload = {
        name: name.trim(),
        bloodgroup: bloodGroup,
        province,
        city,
        phone: phone.trim(),
      };

      const { data, error } = await supabase.from('donors').insert([donorPayload]).select();
      if (error) {
        console.error("Supabase insert error:", error);
        setErrorMsg(error.message);
      } else {
        const added = data && data[0] ? data[0] : donorPayload;
        onDonorRegistered(added);
        onClose();
        alert(lang === 'ur' ? 'بطور ڈونر آپ کا اندراج کامیابی سے ہو گیا ہے!' : 'Successfully registered as donor!');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`relative w-full max-w-lg border rounded-3xl p-6 shadow-2xl max-h-[92vh] overflow-y-auto transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/15 text-rose-600 border border-rose-500/20 flex items-center justify-center text-xl">
              🩸
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'بلڈ ڈونر رجسٹریشن' : 'Register as Blood Donor'}
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'ur' ? 'انسانی جانیں بچانے کے مشن کا حصہ بنیں' : 'Join the mission to save human lives'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg cursor-pointer transition ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-600 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Name */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {lang === 'ur' ? 'پورا نام *' : 'Full Name *'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'ur' ? 'مثال: محمد احمد' : 'e.g. Muhammad Ahmed'}
              className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-rose-500 ${
                isDark ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {lang === 'ur' ? 'بلڈ گروپ *' : 'Blood Group *'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {bloodGroups.map((bg) => (
                <button
                  type="button"
                  key={bg}
                  onClick={() => setBloodGroup(bg)}
                  className={`py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    bloodGroup === bg
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/40 ring-1 ring-rose-400'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {lang === 'ur' ? 'موبائل نمبر (واٹس ایپ والا) *' : 'Mobile Number (WhatsApp) *'}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03001234567"
              className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-rose-500 ${
                isDark ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              {lang === 'ur' ? 'اسی نمبر پر مریض کے لواحقین کال اور واٹس ایپ کریں گے۔' : 'Patients will contact you on this number.'}
            </span>
          </div>

          {/* Province */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {lang === 'ur' ? 'صوبہ *' : 'Province *'}
            </label>
            <select
              value={province}
              onChange={(e) => {
                const newP = e.target.value;
                setProvince(newP);
                setCity(pakistanProvinces[newP][0]);
                setTehsil('');
              }}
              className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              {Object.keys(pakistanProvinces).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {lang === 'ur' ? 'شہر / ضلع *' : 'City / District *'}
            </label>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setTehsil('');
              }}
              className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              {(pakistanProvinces[province] || []).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Tehsil */}
          {currentTehsils.length > 0 && (
            <div>
              <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? 'تحصیل (اختیاری لیکن مفید)' : 'Tehsil (Optional)'}
              </label>
              <select
                value={tehsil}
                onChange={(e) => setTehsil(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="">{lang === 'ur' ? '-- تحصیل منتخب کریں --' : '-- Select Tehsil --'}</option>
                {currentTehsils.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white py-3 rounded-2xl font-black text-sm shadow-lg shadow-rose-600/30 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin text-base">⏳</span>
                  <span>{lang === 'ur' ? 'محفوظ کیا جا رہا ہے...' : 'Saving...'}</span>
                </>
              ) : (
                <>
                  <span>🩸</span>
                  <span>{lang === 'ur' ? 'بطور ڈونر رجسٹریشن مکمل کریں' : 'Complete Registration'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
