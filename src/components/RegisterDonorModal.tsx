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
}

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const RegisterDonorModal: React.FC<RegisterDonorModalProps> = ({
  isOpen,
  onClose,
  defaultProvince,
  defaultCity,
  onDonorRegistered,
  lang,
}) => {
  const initialProvince = defaultProvince || Object.keys(pakistanProvinces)[0];
  const initialCity = defaultCity || pakistanProvinces[initialProvince][0];

  const [province, setProvince] = useState(initialProvince);
  const [city, setCity] = useState(initialCity);
  const [tehsil, setTehsil] = useState('');
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [phone, setPhone] = useState('');
  const [hospitalNear, setHospitalNear] = useState('');
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
      setErrorMsg(lang === 'ur' ? 'براہ کرم درست موبائل نمبر درج کریں (مثلاً 03001234567)۔' : 'Please enter a valid mobile number.');
      return;
    }

    setLoading(true);

    try {
      const donorPayload = {
        name: name.trim(),
        bloodgroup: bloodGroup,
        bloodGroup: bloodGroup,
        province,
        city,
        tehsil: tehsil || null,
        phone: phone.trim(),
        area: tehsil || null,
        hospital_near: hospitalNear.trim() || null,
      };

      const { data, error } = await supabase.from('donors').insert([donorPayload]).select();

      if (error) {
        console.error("Supabase insert error:", error);
        setErrorMsg(error.message);
      } else {
        const added = data && data[0] ? data[0] : donorPayload;
        onDonorRegistered(added);
        onClose();
        alert(lang === 'ur' ? 'جزاک اللہ! آپ بطور ڈونر کامیابی سے رجسٹر ہو گئے ہیں۔' : 'Successfully registered as donor!');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[92vh] overflow-y-auto text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl">
              🩸
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'ur' ? 'بطور بلڈ ڈونر رجسٹر ہوں' : 'Register as Blood Donor'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ur' ? 'انسانیت کی خدمت اور جان بچانے کے لیے اپنی معلومات درج کریں' : 'Join the mission to save human lives'}
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

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-950/70 border border-red-800 text-red-200 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ur' ? 'مکمل نام *' : 'Full Name *'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'ur' ? 'مثال: محمد احمد' : 'e.g. Muhammad Ahmed'}
              className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
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
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ur' ? 'موبائل نمبر (واٹس ایپ والا) *' : 'Mobile / WhatsApp Number *'}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03001234567"
              className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono text-left dir-ltr"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              {lang === 'ur' ? 'اسی نمبر پر مریض کے لواحقین کال اور واٹس ایپ کریں گے۔' : 'Patients will call and WhatsApp on this number.'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'ur' ? 'صوبہ *' : 'Province *'}
              </label>
              <select
                value={province}
                onChange={(e) => {
                  const newProv = e.target.value;
                  setProvince(newProv);
                  setCity(pakistanProvinces[newProv][0]);
                  setTehsil('');
                }}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                {Object.keys(pakistanProvinces).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'ur' ? 'شہر / ضلع *' : 'City / District *'}
              </label>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setTehsil('');
                }}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-semibold"
              >
                {pakistanProvinces[province]?.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ur' ? 'تحصیل یا علاقہ (اختیاری لیکن مفید)' : 'Tehsil / Area (Optional)'}
            </label>
            {currentTehsils.length > 0 ? (
              <select
                value={tehsil}
                onChange={(e) => setTehsil(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 mb-2"
              >
                <option value="">{lang === 'ur' ? 'تحصیل منتخب کریں (اختیاری)' : 'Select Tehsil'}</option>
                {currentTehsils.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            ) : null}
            <input
              type="text"
              value={tehsil}
              onChange={(e) => setTehsil(e.target.value)}
              placeholder={lang === 'ur' ? 'علاقہ یا محلہ کا نام (مثلاً کبیروالا، کینٹ)' : 'Area name (e.g. Cantt, Saddar)'}
              className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ur' ? 'قریبی بڑا ہسپتال (اختیاری)' : 'Nearby Major Hospital (Optional)'}
            </label>
            <input
              type="text"
              value={hospitalNear}
              onChange={(e) => setHospitalNear(e.target.value)}
              placeholder={lang === 'ur' ? 'مثال: DHQ ہسپتال خانیوال، نشتر ہسپتال' : 'e.g. DHQ Hospital, Nishtar Hospital'}
              className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-rose-600/30 transition active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>{lang === 'ur' ? 'رجسٹر ہو رہا ہے...' : 'Registering...'}</span>
              ) : (
                <>
                  <span>🩸</span>
                  <span>{lang === 'ur' ? 'بطور ڈونر رجسٹر ہوں' : 'Complete Registration'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
