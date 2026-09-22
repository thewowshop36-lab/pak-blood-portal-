import React, { useState } from 'react';
import { bloodCompatibility } from '../data/pakistanLocations';

interface BloodGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ur' | 'en';
}

export const BloodGuideModal: React.FC<BloodGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [selectedGroup, setSelectedGroup] = useState('O+');

  if (!isOpen) return null;

  const info = bloodCompatibility[selectedGroup] || bloodCompatibility['O+'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-850 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl">
              🩸
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'ur' ? 'خون کی مطابقت اور معلوماتی گائیڈ' : 'Blood Compatibility & Eligibility'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ur' ? 'کون کس کو خون دے سکتا ہے اور کون کس سے لے سکتا ہے' : 'Who can donate to and receive from whom'}
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

        <div className="my-5">
          <label className="text-xs font-bold text-slate-300 block mb-2">
            {lang === 'ur' ? 'اپنا بلڈ گروپ منتخب کریں:' : 'Select Your Blood Group:'}
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {Object.keys(bloodCompatibility).map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedGroup(bg)}
                className={`py-2 rounded-xl font-black text-sm transition cursor-pointer ${
                  selectedGroup === bg
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 ring-2 ring-rose-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 mb-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-rose-400">{selectedGroup}</span>
            <span className="text-xs bg-rose-500/10 text-rose-300 px-3 py-1 rounded-full border border-rose-500/20 font-bold">
              {info.tagUrdu}
            </span>
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-1.5">
              ✓ {lang === 'ur' ? `کس کس کو خون دے سکتا ہے (${selectedGroup} Can Donate To):` : `Can Donate To:`}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {info.canGiveTo.map((g) => (
                <span
                  key={g}
                  className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-xl text-xs font-bold"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-sky-400 block mb-1.5">
              ✓ {lang === 'ur' ? `کس کس سے خون لے سکتا ہے (${selectedGroup} Can Receive From):` : `Can Receive From:`}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {info.canReceiveFrom.map((g) => (
                <span
                  key={g}
                  className="bg-sky-500/15 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-xl text-xs font-bold"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 text-xs space-y-2 text-slate-300 leading-relaxed">
          <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
            <span>📋</span>
            <span>{lang === 'ur' ? 'خون کا عطیہ دینے کی شرائط:' : 'Blood Donation Eligibility:'}</span>
          </h4>
          <p>• عمر کم از کم ۱۸ سال اور زیادہ سے زیادہ ۶۰ سال ہونی چاہیے۔</p>
          <p>• وزن کم از کم ۵۰ کلو گرام (50kg) ہونا ضروری ہے۔</p>
          <p>• پچھلے خون کے عطیے کو کم از کم ۳ ماہ (90 دن) گزر چکے ہوں۔</p>
          <p>• ہیپاٹائٹس بی، سی، ایچ آئی وی، یا ملیریا جیسی بیماریوں سے پاک ہوں۔</p>
          <p>• ہیموگلوبن (Hb) کی مقدار مناسب ہو (مردوں میں 13+ اور خواتین میں 12+)۔</p>
        </div>

        <div className="mt-5 text-center">
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
