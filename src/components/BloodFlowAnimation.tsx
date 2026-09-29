import React from 'react';

export const BloodFlowAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-40 dark:opacity-30 transition-opacity">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 450"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blood Gradient */}
          <linearGradient id="bloodPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e11d48" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>

          {/* Blood Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Liquid Bag Gradient */}
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="60%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
        </defs>

        <style>{`
          /* خون کے بہاؤ کی حرکت */
          @keyframes bloodStream {
            0% { stroke-dashoffset: 600; }
            100% { stroke-dashoffset: 0; }
          }
          /* دل کی دھڑکن */
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            14% { transform: scale(1.18); }
            28% { transform: scale(1.05); }
            42% { transform: scale(1.22); }
            70% { transform: scale(1); }
          }
          /* خون کے قطرے گرنا */
          @keyframes dropFalling {
            0% { transform: translateY(0); opacity: 0; }
            30% { opacity: 1; }
            80% { transform: translateY(50px); opacity: 1; }
            100% { transform: translateY(60px); opacity: 0; }
          }
          /* بلڈ بیگ میں ہلکورے */
          @keyframes liquidWave {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          /* ای سی جی نبض */
          @keyframes ecgPulse {
            0% { stroke-dashoffset: 400; opacity: 0.2; }
            50% { opacity: 0.9; }
            100% { stroke-dashoffset: 0; opacity: 0.2; }
          }

          .animate-stream {
            stroke-dasharray: 24 16;
            animation: bloodStream 2.5s linear infinite;
          }
          .animate-heart {
            transform-origin: 1040px 220px;
            animation: heartbeat 1.4s ease-in-out infinite;
          }
          .animate-drop-1 {
            animation: dropFalling 1.8s ease-in infinite;
          }
          .animate-drop-2 {
            animation: dropFalling 1.8s ease-in 0.9s infinite;
          }
          .animate-wave {
            animation: liquidWave 3s ease-in-out infinite;
          }
          .animate-ecg {
            stroke-dasharray: 80 120;
            animation: ecgPulse 3s linear infinite;
          }
        `}</style>

        {/* ================= 1. BACKGROUND ECG LIFELINE ================= */}
        <path
          d="M 50,340 L 300,340 L 330,310 L 350,370 L 380,290 L 410,360 L 430,340 L 750,340 L 780,310 L 800,380 L 830,280 L 860,360 L 880,340 L 1150,340"
          stroke="#f43f5e"
          strokeWidth="1.5"
          opacity="0.25"
          className="animate-ecg"
        />

        {/* ================= 2. LEFT: DONOR ARM & VEIN (ڈونر کا بازو اور رگ) ================= */}
        <g id="donor-arm" transform="translate(60, 160)">
          {/* بازو کا خوبصورت سلہوٹ */}
          <path
            d="M 0,90 Q 60,85 100,75 Q 140,65 170,45 Q 185,35 195,15"
            stroke="#94a3b8"
            strokeWidth="24"
            strokeLinecap="round"
            opacity="0.15"
          />
          {/* نیڈل پورٹ */}
          <circle cx="180" cy="38" r="10" fill="#38bdf8" opacity="0.8" />
          <circle cx="180" cy="38" r="5" fill="#ffffff" />
          {/* لیبل */}
          <text x="50" y="45" fill="#f43f5e" fontSize="13" fontWeight="900" letterSpacing="1">
            عطیہ خون (DONOR)
          </text>
        </g>

        {/* ٹیوب 1: ڈونر سے بلڈ بیگ تک شفاف نالی */}
        <path
          d="M 240,198 C 320,198 380,240 480,180"
          stroke="#cbd5e1"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* ٹیوب 1 کے اندر خون کا بہاؤ */}
        <path
          d="M 240,198 C 320,198 380,240 480,180"
          stroke="url(#bloodPulse)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#glow)"
          className="animate-stream"
        />

        {/* ================= 3. CENTER: BLOOD BAG (بلڈ بیگ) ================= */}
        <g id="blood-bag" transform="translate(480, 100)">
          {/* بیگ کا اوپر والا ہینگر */}
          <rect x="55" y="0" width="30" height="15" rx="5" fill="#64748b" opacity="0.4" />
          <line x1="70" y1="15" x2="70" y2="40" stroke="#64748b" strokeWidth="4" opacity="0.4" />

          {/* ٹرانسپیرنٹ بیگ کی باڈی */}
          <rect
            x="20"
            y="40"
            width="100"
            height="150"
            rx="18"
            fill="#ffffff"
            fillOpacity="0.07"
            stroke="#e2e8f0"
            strokeWidth="3"
            strokeOpacity="0.4"
          />

          {/* بیگ کے اندر بھرا ہوا خون */}
          <path
            d="M 23,110 Q 50,105 70,110 T 117,110 L 117,175 Q 117,187 104,187 L 36,187 Q 23,187 23,175 Z"
            fill="url(#liquidGrad)"
            filter="url(#glow)"
            className="animate-wave"
          />

          {/* خون کے گرتے ہوئے قطرے */}
          <circle cx="70" cy="55" r="4" fill="#f43f5e" className="animate-drop-1" />
          <circle cx="70" cy="55" r="3.5" fill="#e11d48" className="animate-drop-2" />

          {/* بلڈ بیگ پر میڈیکل لیبل */}
          <rect x="35" y="65" width="70" height="35" rx="4" fill="#ffffff" fillOpacity="0.85" />
          <line x1="42" y1="75" x2="98" y2="75" stroke="#e11d48" strokeWidth="2.5" />
          <line x1="42" y1="84" x2="85" y2="84" stroke="#64748b" strokeWidth="2" />
          <line x1="42" y1="91" x2="75" y2="91" stroke="#94a3b8" strokeWidth="1.5" />
          
          {/* بلڈ گروپ سمبل */}
          <circle cx="92" cy="85" r="8" fill="#e11d48" />
          <text x="89" y="88" fill="#ffffff" fontSize="9" fontWeight="900">+</text>
        </g>

        {/* ٹیوب 2: بلڈ بیگ سے دھڑکتے دل تک نالی */}
        <path
          d="M 550,290 C 650,330 800,260 980,225"
          stroke="#cbd5e1"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* ٹیوب 2 کے اندر خون کا بہاؤ */}
        <path
          d="M 550,290 C 650,330 800,260 980,225"
          stroke="url(#bloodPulse)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#glow)"
          className="animate-stream"
        />

        {/* ================= 4. RIGHT: PULSING HEART (زندگی کا دھڑکتا دل) ================= */}
        <g id="beating-heart" className="animate-heart">
          {/* دل کا سرخ گھیرا اور گلو */}
          <path
            d="M 1040,185 C 1040,165 1015,150 995,170 C 970,195 970,225 1040,285 C 1110,225 1110,195 1085,170 C 1065,150 1040,165 1040,185 Z"
            fill="url(#liquidGrad)"
            filter="url(#glow)"
          />

          {/* دل کی چمک (Shine/Reflection) */}
          <path
            d="M 1005,175 C 995,185 995,200 1010,210"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* زندگی بخش نبض کا متن */}
          <text x="1000" y="325" fill="#f43f5e" fontSize="13" fontWeight="900" letterSpacing="1">
            نئی زندگی (SAVED LIFE)
          </text>
        </g>
      </svg>
    </div>
  );
};
