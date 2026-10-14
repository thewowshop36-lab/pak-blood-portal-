import React, { useState } from 'react';
import { BloodRequest } from '../types';
import { isMyRequest } from '../lib/userRequests';

interface BloodRequestCardProps {
  request: BloodRequest;
  lang: 'ur' | 'en';
  theme: 'light' | 'dark';
  onMarkResolved: (request: BloodRequest) => void;
  onShare: (request: BloodRequest) => void;
  isOwner?: boolean;
}

export const BloodRequestCard: React.FC<BloodRequestCardProps> = ({
  request,
  lang,
  theme,
  onMarkResolved,
  onShare,
  isOwner: propIsOwner,
}) => {
  const isDark = theme === 'dark';
  const [resolving, setResolving] = useState(false);

  // Check if current user is the owner/creator of this request
  const isOwner = propIsOwner !== undefined ? propIsOwner : isMyRequest(request);

  const cleanPhone = request.contact ? request.contact.replace(/[^0-9]/g, '') : '';
  let waNumber = cleanPhone;
  if (waNumber.startsWith('03')) waNumber = '92' + waNumber.slice(1);
  const waMsg = encodeURIComponent(
    `السلام علیکم! میں نے پاکستان بلڈ پورٹل پر مریض (${request.patient_name}) کے لیے بلڈ گروپ (${request.blood_group}) کی ضرورت دیکھی ہے۔ کیا اب بھی خون درکار ہے؟`
  );

  const handleResolveClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmText =
      lang === 'ur'
        ? `کیا آپ کو مریض "${request.patient_name}" کے لیے خون مل گیا ہے؟\n\nاس بٹن کو دبانے سے یہ اپیل ہوم پیج اور لسٹ سے ہٹا دی جائے گی تاکہ مزید کالز نہ آئیں اور مسئلہ حل شدہ میں سیو ہو جائے۔`
        : `Have you received blood for patient "${request.patient_name}"?\n\nThis will remove the appeal from the portal and mark it as resolved.`;

    if (window.confirm(confirmText)) {
      setResolving(true);
      try {
        await onMarkResolved(request);
      } finally {
        setResolving(false);
      }
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(request);
  };

  return (
    <div
      className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md relative ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40'
          : 'bg-white border-slate-200 hover:border-amber-400'
      }`}
    >
      {/* Top Banner / Tags */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[11px] font-black px-2.5 py-0.5 rounded-full">
              {request.urgency || (lang === 'ur' ? 'انتہائی فوری / Immediate' : 'Immediate')}
            </span>

            {/* Owner badge if posted by current user */}
            {isOwner && (
              <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>👤</span>
                <span>{lang === 'ur' ? 'آپ کی اپیل' : 'Your Appeal'}</span>
              </span>
            )}
          </div>

          {/* Blood group tag */}
          <span className="text-2xl font-black text-rose-600 bg-rose-50 dark:bg-rose-950/70 px-3 py-1 rounded-2xl border border-rose-200 dark:border-rose-900 shadow-xs">
            {request.blood_group}
          </span>
        </div>

        {/* Patient Name */}
        <h4 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {request.patient_name}
        </h4>

        {/* Hospital & Location */}
        <div className="mt-2.5 space-y-1.5 text-xs font-medium">
          <p className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className="text-sm">🏥</span>
            <span className="font-bold">{request.hospital}</span>
          </p>

          <p className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <span className="text-sm">📍</span>
            <span>{request.city} {request.province ? `(${request.province})` : ''}</span>
          </p>

          {request.units_needed && (
            <p className={`flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
              <span className="text-sm">🩸</span>
              <span className="font-bold">
                {lang === 'ur' ? `${request.units_needed} بوتلیں درکار ہیں` : `${request.units_needed} Units Needed`}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
        {/* Row 1: WhatsApp and Direct Call */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`https://wa.me/${waNumber}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-3 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-xs transition active:scale-95"
          >
            <span className="text-sm">💬</span>
            <span>{lang === 'ur' ? 'واٹس ایپ' : 'WhatsApp'}</span>
          </a>
          <a
            href={`tel:${request.contact}`}
            className="bg-rose-600 hover:bg-rose-500 text-white py-2.5 px-3 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-xs transition active:scale-95"
          >
            <span className="text-sm">📞</span>
            <span>{lang === 'ur' ? 'کال کریں' : 'Call'}</span>
          </a>
        </div>

        {/* Row 2: Mark as Resolved and Share buttons for all requests */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleResolveClick}
            disabled={resolving}
            className="bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer disabled:opacity-50"
            title={lang === 'ur' ? 'بلڈ ملنے پر اپیل بند کریں' : 'Mark as resolved / Blood received'}
          >
            <span>{resolving ? '⏳' : '✅'}</span>
            <span>{lang === 'ur' ? 'بلڈ مل گیا (حل شدہ)' : 'Blood Received'}</span>
          </button>

          <button
            onClick={handleShareClick}
            className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <span>📢</span>
            <span>{lang === 'ur' `شیئر کریں` : 'Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
