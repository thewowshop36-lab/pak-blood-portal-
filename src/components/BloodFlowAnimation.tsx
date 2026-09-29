import React from 'react';

export const BloodFlowAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-45 dark:opacity-35 transition-opacity">
      <svg
        className="w-full h-full"
        viewBox="0 0 500 380"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blood Gradient */}
          <linearGradient id="bloodPulseMob" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e11d48" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>

          {/* Blood Glow Filter */}
          <filter id="glowMob" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Liquid Bag Gradient */}
          <linearGradient id="liquidGradMob" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="60%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes bloodStreamMob {
            0% { stroke-dashoffset: 400; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes heartbeatMob {
            0%, 100% { transform: scale(1); }
            14% { transform: scale(1.15); }
            28% { transform: scale(1.04); }
            42% { transform: scale(1.18); }
            70% { transform: scale(1); }
          }
          @keyframes dropFallingMob {
            0% { transform: translateY(0); opacity: 0; }
            30% { opacity: 1; }
            80% { transform: translateY(35px); opacity: 1; }
            100% { transform: translateY(42px); opacity: 0; }
          }
          @keyframes liquidWaveMob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          @keyframes ecgPulseMob {
            0% { stroke-dashoffset: 300; opacity: 0.15; }
            50% { opacity: 0.6; }
            100% { stroke-dashoffset: 0; opacity: 0.15; }
          }

          .animate-stream-mob {
            stroke-dasharray: 18 12;
            animation: bloodStreamMob 2s linear infinite;
          }
          .animate-heart-mob {
            transform-origin: 435px 285px;
            animation: heartbeatMob 1.3s ease-in-out infinite;
          }
          .animate-drop-mob {
            animation: dropFallingMob 1.6s ease-in infinite;
          }
          .animate-wave-mob {
            animation: liquidWaveMob 2.5s ease-in-out infinite;
          }
          .animate-ecg-mob {
            stroke-dasharray: 60 90;
            animation: ecgPulseMob 2.5s linear infinite;
          }
        `}</style>

        {/* 1. BACKGROUND ECG LIFELINE */}
        <path
          d="M 10,340 L 120,340 L 140,315 L 155,365 L 175,295 L 195,355 L 210,340 L 320,340 L 335,315 L 350,365 L 370,295 L 390,355 L 405,340 L 490,340"
          stroke="#f43f5e"
          strokeWidth="1.2"
          opacity="0.2"
          className="animate-ecg-mob"
        />

        {/* 2. LEFT: DONOR ARM & NEEDLE (ڈونر کا بازو اور نیڈل) */}
        <g id="donor-arm-mob" transform="translate(15, 140)">
          {/* بازو */}
          <path
            d="M 5,60 Q 30,55 50,45 Q 65,35 75,20"
            stroke="#94a3b8"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.25"
          />
          {/* کینولا / نیڈل */}
          <circle cx="70" cy="25" r="6" fill="#38bdf8" />
          <circle cx="70" cy="25" r="3" fill="#ffffff" />
          {/* ڈونر لیبل */}
          <text x="5" y="15" fill="#f43f5e" fontSize="10" fontWeight="900">
            DONOR (ڈونر)
          </text>
        </g>

        {/* ٹیوب 1: ڈونر سے بیگ تک */}
        <path
          d="M 90,165 C 140,165 170,200 215,160"
          stroke="#cbd5e1"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M 90,165 C 140,165 170,200 215,160"
          stroke="url(#bloodPulseMob)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#glowMob)"
          className="animate-stream-mob"
        />

        {/* 3. CENTER: COMPACT BLOOD BAG (درمیان میں پرفیکٹ بلڈ بیگ) */}
        <g id="blood-bag-mob" transform="translate(215, 105)">
          {/* بیگ ہینگر */}
          <rect x="28" y="0" width="18" height="10" rx="3" fill="#64748b" opacity="0.5" />
          <line x1="37" y1="10" x2="37" y2="25" stroke="#64748b" strokeWidth="3" opacity="0.5" />

          {/* ٹرانسپیرنٹ باڈی */}
          <rect
            x="10"
            y="25"
            width="55"
            height="85"
            rx="12"
            fill="#ffffff"
            fillOpacity="0.1"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeOpacity="0.5"
          />

          {/* بیگ کا خون */}
          <path
            d="M 12,65 Q 27,62 37,65 T 63,65 L 63,98 Q 63,108 55,108 L 20,108 Q 12,108 12,98 Z"
            fill="url(#liquidGradMob)"
            filter="url(#glowMob)"
            className="animate-wave-mob"
          />

          {/* گرتا ہوا قطرہ */}
          <circle cx="37" cy="35" r="2.8" fill="#f43f5e" className="animate-drop-mob" />

          {/* بلڈ لیبل */}
          <rect x="18" y="40" width="38" height="20" rx="3" fill="#ffffff" fillOpacity="0.8" />
          <line x1="22" y1="46" x2="52" y2="46" stroke="#e11d48" strokeWidth="1.5" />
          <line x1="22" y1="52" x2="45" y2="52" stroke="#64748b" strokeWidth="1.2" />
          <circle cx="48" cy="52" r="4.5" fill="#e11d48" />
          <text x="46" y="54" fill="#ffffff" fontSize="6" fontWeight="900">+</text>
        </g>

        {/* ٹیوب 2: بلڈ بیگ سے دل تک */}
        <path
          d="M 252,215 C 300,240 360,200 405,275"
          stroke="#cbd5e1"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M 252,215 C 300,240 360,200 405,275"
          stroke="url(#bloodPulseMob)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#glowMob)"
          className="animate-stream-mob"
        />

        {/* 4. RIGHT: PULSING HEART (دائیں طرف دھڑکتا ہوا دل) */}
        <g id="beating-heart-mob" className="animate-heart-mob">
          {/* دل */}
          <path
            d="M 435,265 C 435,250 417,238 402,253 C 384,272 384,295 435,340 C 486,295 486,272 468,253 C 453,238 435,250 435,265 Z"
            fill="url(#liquidGradMob)"
            filter="url(#glowMob)"
          />
          {/* دل کی چمک */}
          <path
            d="M 410,257 C 402,265 402,276 414,284"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* لائف لیبل */}
          <text x="390" y="360" fill="#f43f5e" fontSize="10" fontWeight="900">
            SAVED LIFE (زندگی)
          </text>
        </g>
      </svg>
    </div>
  );
};
