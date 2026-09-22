import React from 'react';
import { BloodRequest } from '../types';

interface EmergencyBannerProps {
  requests: BloodRequest[];
  onViewAll: () => void;
  lang: 'ur' | 'en';
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  requests,
  onViewAll,
  lang,
}) => {
  if (requests.length === 0) return null;

  const urgentRequest = requests[0];
  const cleanContact = urgentRequest.contact ? urgentRequest.contact.replace(/[^0-9]/g, '') : '';
  let waNumber = cleanContact;
  if (waNumber.startsWith('03')) waNumber = '92' + waNumber.slice(1);

  const waMsg = encodeURIComponent(
    `السلام علیکم! میں نے پاکستان بلڈ پورٹل پر مریض (${urgentRequest.patient_name}) کے لیے بلڈ گروپ (${urgentRequest.blood_group}) کی ہنگامی ضرورت کی پوسٹ دیکھی ہے۔ کیا اب بھی خون کی ضرورت ہے؟`
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border border-red-700/50 rounded-2xl p-4 mb-6 shadow-2xl shadow-rose-950/50 text-white">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-xl shadow-lg shadow-rose-600/50 animate-bounce">
              🚨
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-red-500 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                {lang === 'ur' ? 'انتہائی ہنگامی اپیل' : 'Emergency Blood Alert'}
              </span>
              <span className="text-xs text-rose-200 font-semibold">
                {urgentRequest.urgency || (lang === 'ur' ? 'فوری ضرورت' : 'Immediate')}
              </span>
            </div>

            <p className="text-sm md:text-base font-black mt-1 text-white">
              {lang === 'ur' ? 'مریض:' : 'Patient:'} {urgentRequest.patient_name} —{' '}
              <span className="text-amber-300 font-black px-1.5 py-0.5 bg-amber-950/60 rounded-md border border-amber-500/30">
                {urgentRequest.blood_group}
              </span>{' '}
              ({urgentRequest.hospital}, {urgentRequest.city})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <a
            href={`https://wa.me/${waNumber}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-950"
          >
            <span>💬</span>
            <span>{lang === 'ur' ? 'واٹس ایپ' : 'WhatsApp'}</span>
          </a>

          <a
            href={`tel:${urgentRequest.contact}`}
            className="bg-white hover:bg-slate-100 text-rose-900 px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md"
          >
            <span>📞</span>
            <span>{lang === 'ur' ? 'کال کریں' : 'Call'}</span>
          </a>

          {requests.length > 1 && (
            <button
              onClick={onViewAll}
              className="bg-rose-800/80 hover:bg-rose-700 text-rose-200 px-3 py-2 rounded-xl text-xs font-bold border border-rose-600/40 transition cursor-pointer"
            >
              {lang === 'ur' ? `تمام (${requests.length}) دیکھیں` : `View All (${requests.length})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
