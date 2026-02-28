"use client";

import { useState, useEffect } from "react";
import { CONFIG } from "@/config/invite";

interface GruhapraveshamIntroProps {
  onComplete: () => void;
  hostNames: string;
}

export default function GruhapraveshamIntro({ onComplete, hostNames }: GruhapraveshamIntroProps) {
  const [scene, setScene] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    const timers = [
      setTimeout(() => setScene(1), 300),     // Background fades in
      setTimeout(() => setScene(2), 1000),    // Ganesha appears
      setTimeout(() => setScene(3), 4000),    // Ganesha text
      setTimeout(() => setScene(4), 7000),    // Transition
      setTimeout(() => setScene(5), 8000),    // Doorway appears
      setTimeout(() => setScene(6), 11000),   // Gruhapravesham text
      setTimeout(() => setScene(7), 14000),   // Couple scene
      setTimeout(() => setScene(8), 17000),   // Event details
      setTimeout(() => setScene(9), 21000),   // Host names
      setTimeout(() => onComplete(), 25000),  // End
    ];

    return () => {
      clearTimeout(skipTimer);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  if (!mounted) {
    return <div className="fixed inset-0 z-50 bg-gradient-to-b from-amber-50 to-orange-50" />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #FDF6E3 0%, #F9E4B7 50%, #FDF6E3 100%)"
        }}
      />

      {/* Mandala Left */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 transition-all duration-[2000ms] ${
        scene >= 1 ? "opacity-30 scale-100" : "opacity-0 scale-50"
      }`}>
        <Mandala />
      </div>

      {/* Mandala Right */}
      <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 transition-all duration-[2000ms] ${
        scene >= 1 ? "opacity-30 scale-100" : "opacity-0 scale-50"
      }`}>
        <Mandala />
      </div>

      {/* Sparkles */}
      <Sparkles show={scene >= 1} />

      {/* Scene 1: Ganesha */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
        scene >= 2 && scene <= 4 ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <div className={`transition-all duration-1000 ${
          scene >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}>
          <Ganesha />
        </div>

        <div className={`mt-8 text-center transition-all duration-700 ${
          scene >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <p className="text-2xl md:text-3xl font-serif text-amber-800" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            || Om Sri Ganeshaya Namah ||
          </p>
          <div className="mt-4 flex justify-center">
            <Flourish />
          </div>
        </div>
      </div>

      {/* Scene 2: Doorway */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
        scene >= 5 && scene <= 6 ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <div className={`transition-all duration-1000 ${
          scene >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}>
          <Doorway />
        </div>

        <div className={`mt-4 text-center transition-all duration-700 ${
          scene >= 6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <p className="text-lg text-amber-600">New Home</p>
          <h2 className="text-4xl md:text-5xl font-serif text-amber-800 mt-1" style={{
            background: "linear-gradient(180deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Gruhapravesham
          </h2>
          <p className="text-xl text-amber-700 mt-1">Invitation</p>
          <div className="mt-4 flex justify-center">
            <Flourish />
          </div>
        </div>
      </div>

      {/* Scene 3: Couple with Cow */}
      <div className={`absolute inset-0 flex flex-col items-center transition-all duration-1000 ${
        scene >= 7 ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        {/* Event Details */}
        <div className={`mt-12 text-center transition-all duration-700 px-4 ${
          scene >= 8 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}>
          <div className="inline-block border-2 border-amber-400 rounded-lg px-6 py-3" style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(253,246,227,0.9) 100%)"
          }}>
            <h3 className="text-xl md:text-2xl font-serif text-amber-800">Auspicious Ceremony</h3>
            <div className="mt-2 text-amber-700">
              <p className="text-lg font-semibold">{CONFIG.eventDisplayDate}</p>
              <p className="text-lg">{CONFIG.eventDisplayTime}</p>
              <p className="text-sm mt-1 text-amber-600">Vastu Puja & Homam</p>
            </div>
          </div>
        </div>

        {/* Main Illustration */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative">
            {/* Small Doorway */}
            <div className={`transition-all duration-1000 ${
              scene >= 7 ? "opacity-100" : "opacity-0"
            }`}>
              <SmallDoorway />
            </div>

            {/* Couple */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-300 ${
              scene >= 7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <Couple />
            </div>

            {/* Cow */}
            <div className={`absolute bottom-0 -right-20 transition-all duration-1000 delay-500 ${
              scene >= 7 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}>
              <CowWithCalf />
            </div>
          </div>
        </div>

        {/* Host Names */}
        <div className={`mb-16 text-center transition-all duration-700 ${
          scene >= 9 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <p className="text-amber-600 text-sm">Warmly invited by</p>
          <p className="text-2xl md:text-3xl font-serif text-amber-800 mt-1">{hostNames}</p>
          <div className="mt-3 flex justify-center">
            <Flourish />
          </div>
        </div>
      </div>

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={onComplete}
          className="fixed bottom-6 right-6 px-5 py-2.5 bg-white/90 hover:bg-white text-amber-800 rounded-full shadow-lg transition-all hover:scale-105 text-sm font-medium z-50"
        >
          Skip →
        </button>
      )}

      {/* Progress */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-amber-200/50">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
          style={{ width: `${(scene / 9) * 100}%` }}
        />
      </div>
    </div>
  );
}

// Detailed Mandala Pattern
function Mandala() {
  return (
    <svg width="500" height="500" viewBox="0 0 500 500">
      <defs>
        <linearGradient id="mandalaGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#B8860B" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Outer rings */}
      {[240, 220, 200, 180, 160, 140, 120].map((r, i) => (
        <circle key={i} cx="250" cy="250" r={r} fill="none" stroke="url(#mandalaGold)"
          strokeWidth={i % 2 === 0 ? 1.5 : 0.5} opacity={0.5 - i * 0.05} />
      ))}

      {/* Petal layers */}
      {[0, 1, 2].map((layer) => (
        <g key={layer}>
          {[...Array(16)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 22.5 + layer * 11.25} 250 250)`}>
              <ellipse cx="250" cy={100 + layer * 30} rx={12 - layer * 2} ry={35 - layer * 5}
                fill="none" stroke="url(#mandalaGold)" strokeWidth="1" opacity={0.4 - layer * 0.1} />
            </g>
          ))}
        </g>
      ))}

      {/* Inner details */}
      {[...Array(8)].map((_, i) => (
        <g key={`inner-${i}`} transform={`rotate(${i * 45} 250 250)`}>
          <path d="M250 250 L250 100" stroke="url(#mandalaGold)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="250" cy="100" r="8" fill="none" stroke="url(#mandalaGold)" strokeWidth="1" opacity="0.4" />
          <circle cx="250" cy="120" r="4" fill="url(#mandalaGold)" opacity="0.3" />
        </g>
      ))}

      {/* Center */}
      <circle cx="250" cy="250" r="30" fill="none" stroke="url(#mandalaGold)" strokeWidth="2" opacity="0.5" />
      <circle cx="250" cy="250" r="15" fill="url(#mandalaGold)" opacity="0.3" />
    </svg>
  );
}

// Cute Ganesha matching video style
function Ganesha() {
  return (
    <svg width="280" height="320" viewBox="0 0 280 320">
      <defs>
        <linearGradient id="lotusGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF69B4" />
          <stop offset="50%" stopColor="#FF1493" />
          <stop offset="100%" stopColor="#DB7093" />
        </linearGradient>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB07C" />
          <stop offset="50%" stopColor="#FF9A5C" />
          <stop offset="100%" stopColor="#E88A4C" />
        </linearGradient>
        <linearGradient id="crownGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#DAA520" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <linearGradient id="earGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB6C1" />
          <stop offset="100%" stopColor="#FF69B4" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Lotus Base - Multiple layers */}
      <g transform="translate(140, 280)">
        {/* Back petals */}
        {[-70, -50, -30, 30, 50, 70].map((angle, i) => (
          <ellipse key={`back-${i}`} cx="0" cy="0" rx="22" ry="45"
            fill="url(#lotusGradient)" opacity="0.7"
            transform={`rotate(${angle}) translate(0, -25)`} />
        ))}
        {/* Front petals */}
        {[-45, -15, 15, 45].map((angle, i) => (
          <ellipse key={`front-${i}`} cx="0" cy="0" rx="25" ry="50"
            fill="url(#lotusGradient)"
            transform={`rotate(${angle}) translate(0, -30)`} />
        ))}
        {/* Center petal */}
        <ellipse cx="0" cy="-35" rx="28" ry="55" fill="url(#lotusGradient)" />
        {/* Lotus center */}
        <ellipse cx="0" cy="-10" rx="35" ry="15" fill="#FFB6C1" />
      </g>

      {/* Body */}
      <ellipse cx="140" cy="200" rx="55" ry="50" fill="url(#bodyGradient)" filter="url(#shadow)" />
      <ellipse cx="140" cy="210" rx="40" ry="35" fill="#FFDAB9" opacity="0.6" />

      {/* Left Ear */}
      <ellipse cx="55" cy="110" rx="32" ry="40" fill="url(#bodyGradient)" />
      <ellipse cx="55" cy="110" rx="22" ry="30" fill="url(#earGradient)" />

      {/* Right Ear */}
      <ellipse cx="225" cy="110" rx="32" ry="40" fill="url(#bodyGradient)" />
      <ellipse cx="225" cy="110" rx="22" ry="30" fill="url(#earGradient)" />

      {/* Head */}
      <ellipse cx="140" cy="110" rx="50" ry="45" fill="url(#bodyGradient)" filter="url(#shadow)" />

      {/* Crown */}
      <path d="M85 75 L95 35 L110 55 L125 25 L140 50 L155 25 L170 55 L185 35 L195 75 Z"
        fill="url(#crownGradient)" filter="url(#shadow)" />
      <ellipse cx="140" cy="75" rx="55" ry="12" fill="url(#crownGradient)" />

      {/* Crown Jewels */}
      <circle cx="140" cy="50" r="10" fill="#DC143C" />
      <circle cx="140" cy="50" r="6" fill="#FF6B6B" opacity="0.6" />
      <circle cx="110" cy="60" r="6" fill="#4169E1" />
      <circle cx="170" cy="60" r="6" fill="#32CD32" />

      {/* Trunk */}
      <path d="M140 130 Q125 145 120 170 Q118 185 125 190 Q130 192 135 185 Q138 175 140 160
               Q142 175 145 185 Q150 192 155 190 Q162 185 160 170 Q155 145 140 130"
        fill="url(#bodyGradient)" />

      {/* Eyes */}
      <ellipse cx="115" cy="105" rx="12" ry="14" fill="white" />
      <ellipse cx="165" cy="105" rx="12" ry="14" fill="white" />
      <circle cx="115" cy="108" r="6" fill="#2F1810" />
      <circle cx="165" cy="108" r="6" fill="#2F1810" />
      <circle cx="117" cy="105" r="2" fill="white" />
      <circle cx="167" cy="105" r="2" fill="white" />

      {/* Eyebrows */}
      <path d="M100 92 Q115 88 130 92" stroke="#5D4037" strokeWidth="2" fill="none" />
      <path d="M150 92 Q165 88 180 92" stroke="#5D4037" strokeWidth="2" fill="none" />

      {/* Tilak */}
      <path d="M140 85 L135 100 L140 97 L145 100 Z" fill="#FF4500" />

      {/* Arms */}
      <ellipse cx="75" cy="180" rx="18" ry="35" fill="url(#bodyGradient)" />
      <ellipse cx="205" cy="180" rx="18" ry="35" fill="url(#bodyGradient)" />

      {/* Hands with items */}
      <circle cx="75" cy="150" r="12" fill="#FFDAB9" />
      <circle cx="205" cy="150" r="12" fill="#FFDAB9" />

      {/* Modak (sweet) in right hand */}
      <ellipse cx="205" cy="140" rx="10" ry="8" fill="#FFF8DC" stroke="#DAA520" strokeWidth="1" />

      {/* Small lotus in left hand */}
      <circle cx="75" cy="140" r="8" fill="#FF69B4" />
      <circle cx="75" cy="140" r="4" fill="#FFB6C1" />

      {/* Belly button */}
      <circle cx="140" cy="210" r="4" fill="#E88A4C" />

      {/* Necklace */}
      <path d="M100 150 Q140 165 180 150" stroke="#FFD700" strokeWidth="4" fill="none" />
      <circle cx="140" cy="160" r="6" fill="#DC143C" />
    </svg>
  );
}

// Decorative Flourish
function Flourish() {
  return (
    <svg width="180" height="30" viewBox="0 0 180 30">
      <defs>
        <linearGradient id="flourishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DAA520" stopOpacity="0" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#DAA520" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 15 Q40 5 70 15 T90 15" stroke="url(#flourishGrad)" strokeWidth="1.5" fill="none" />
      <path d="M180 15 Q140 5 110 15 T90 15" stroke="url(#flourishGrad)" strokeWidth="1.5" fill="none" />
      <circle cx="90" cy="15" r="5" fill="#DAA520" />
      <path d="M75 15 Q90 8 105 15" stroke="#DAA520" strokeWidth="1" fill="none" />
      <path d="M75 15 Q90 22 105 15" stroke="#DAA520" strokeWidth="1" fill="none" />
    </svg>
  );
}

// Detailed Doorway
function Doorway() {
  return (
    <svg width="260" height="340" viewBox="0 0 260 340">
      <defs>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5D3A1A" />
          <stop offset="30%" stopColor="#8B4513" />
          <stop offset="70%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#5D3A1A" />
        </linearGradient>
        <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <linearGradient id="kalashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8860B" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <filter id="doorShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* Door Frame */}
      <path d="M30 60 Q130 25 230 60 L230 340 L30 340 Z" fill="url(#woodGrad)" filter="url(#doorShadow)" />

      {/* Inner door (light) */}
      <rect x="50" y="85" width="160" height="245" fill="#FFF8DC" rx="3" />

      {/* Carved arch top */}
      <path d="M50 60 Q130 35 210 60" fill="none" stroke="#3E2723" strokeWidth="4" />
      <ellipse cx="130" cy="50" rx="30" ry="18" fill="#5D3A1A" />
      <ellipse cx="130" cy="50" rx="18" ry="10" fill="#8B4513" />

      {/* Carved details on frame */}
      <rect x="35" y="85" width="10" height="245" fill="#3E2723" opacity="0.3" />
      <rect x="215" y="85" width="10" height="245" fill="#3E2723" opacity="0.3" />

      {/* Marigold Toran */}
      <path d="M30 65 Q80 110 130 85 Q180 110 230 65"
        fill="none" stroke="url(#marigoldGrad)" strokeWidth="20" strokeLinecap="round" />

      {/* Marigold flowers */}
      {[45, 70, 95, 130, 165, 190, 215].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={75 + (i % 2) * 15} r="12" fill="#FFA500" />
          <circle cx={x} cy={75 + (i % 2) * 15} r="8" fill="#FFD700" />
          <circle cx={x} cy={75 + (i % 2) * 15} r="4" fill="#FF8C00" />
        </g>
      ))}

      {/* Mango Leaves */}
      {[55, 95, 165, 205].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 95 Q${x-8} 130 ${x} 155`} fill="#228B22" />
          <path d={`M${x} 95 Q${x+8} 130 ${x} 155`} fill="#32CD32" />
          <path d={`M${x} 95 L${x} 155`} stroke="#006400" strokeWidth="1" />
        </g>
      ))}

      {/* Kalash at bottom */}
      <g transform="translate(130, 320)">
        {/* Base */}
        <ellipse cx="0" cy="15" rx="30" ry="10" fill="#8B4513" />
        {/* Pot body */}
        <path d="M-25 15 Q-30 -10 -18 -35 Q0 -50 18 -35 Q30 -10 25 15 Z" fill="url(#kalashGrad)" />
        {/* Pot neck */}
        <rect x="-12" y="-50" width="24" height="12" fill="url(#kalashGrad)" />
        {/* Red cloth */}
        <path d="M-18 -40 Q0 -30 18 -40" stroke="#DC143C" strokeWidth="6" fill="none" />
        {/* Coconut */}
        <ellipse cx="0" cy="-60" rx="15" ry="12" fill="#654321" />
        <ellipse cx="0" cy="-58" rx="10" ry="8" fill="#8B4513" />
        {/* Mango leaves on coconut */}
        <path d="M0 -72 Q-12 -90 -8 -100" stroke="#228B22" strokeWidth="4" fill="none" />
        <path d="M0 -72 Q12 -90 8 -100" stroke="#228B22" strokeWidth="4" fill="none" />
        <path d="M0 -72 Q0 -95 0 -105" stroke="#32CD32" strokeWidth="4" fill="none" />
        {/* Swastika on pot */}
        <g transform="translate(0, -15)">
          <path d="M-6 0 L6 0 M0 -6 L0 6" stroke="#DC143C" strokeWidth="2" />
          <path d="M6 0 L6 -4 M-6 0 L-6 4 M0 -6 L4 -6 M0 6 L-4 6" stroke="#DC143C" strokeWidth="2" />
        </g>
      </g>

      {/* Banana Plants */}
      <g transform="translate(25, 250)">
        {[-15, 0, 15].map((angle, i) => (
          <path key={i} d={`M0 80 Q${angle} 40 ${angle * 2} 0`}
            fill="none" stroke="#228B22" strokeWidth="12" strokeLinecap="round" />
        ))}
        {[-15, 0, 15].map((angle, i) => (
          <path key={`leaf-${i}`} d={`M0 80 Q${angle} 40 ${angle * 2} 0`}
            fill="none" stroke="#32CD32" strokeWidth="8" strokeLinecap="round" />
        ))}
      </g>
      <g transform="translate(235, 250)">
        {[-15, 0, 15].map((angle, i) => (
          <path key={i} d={`M0 80 Q${-angle} 40 ${-angle * 2} 0`}
            fill="none" stroke="#228B22" strokeWidth="12" strokeLinecap="round" />
        ))}
        {[-15, 0, 15].map((angle, i) => (
          <path key={`leaf-${i}`} d={`M0 80 Q${-angle} 40 ${-angle * 2} 0`}
            fill="none" stroke="#32CD32" strokeWidth="8" strokeLinecap="round" />
        ))}
      </g>

      {/* Flowers at base */}
      {[40, 60, 200, 220].map((x, i) => (
        <circle key={i} cx={x} cy={330} r="10" fill={i % 2 === 0 ? "#FF69B4" : "#FFB6C1"} />
      ))}
    </svg>
  );
}

// Small Doorway for couple scene
function SmallDoorway() {
  return (
    <svg width="160" height="200" viewBox="0 0 160 200">
      <defs>
        <linearGradient id="smallWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5D3A1A" />
          <stop offset="50%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#5D3A1A" />
        </linearGradient>
      </defs>

      <path d="M20 40 Q80 15 140 40 L140 200 L20 200 Z" fill="url(#smallWoodGrad)" />
      <rect x="35" y="55" width="90" height="140" fill="#FFF8DC" rx="2" />

      {/* Toran */}
      <path d="M20 42 Q50 70 80 50 Q110 70 140 42"
        fill="none" stroke="#FFA500" strokeWidth="12" strokeLinecap="round" />

      {/* Mango leaves */}
      {[40, 70, 90, 120].map((x, i) => (
        <path key={i} d={`M${x} 60 Q${x} 80 ${x} 95`} stroke="#228B22" strokeWidth="4" fill="none" />
      ))}
    </svg>
  );
}

// Couple illustration
function Couple() {
  return (
    <svg width="140" height="200" viewBox="0 0 140 200">
      {/* Woman */}
      <g transform="translate(35, 0)">
        {/* Hair */}
        <ellipse cx="35" cy="25" rx="22" ry="24" fill="#1a1a1a" />
        {/* Face */}
        <circle cx="35" cy="25" r="18" fill="#D2A679" />
        {/* Hair detail */}
        <path d="M15 25 Q35 5 55 25" fill="#1a1a1a" />
        {/* Bindi */}
        <circle cx="35" cy="20" r="3" fill="#DC143C" />
        {/* Eyes */}
        <ellipse cx="30" cy="25" rx="2" ry="3" fill="#2F1810" />
        <ellipse cx="40" cy="25" rx="2" ry="3" fill="#2F1810" />

        {/* Braid */}
        <path d="M35 45 L35 180" stroke="#1a1a1a" strokeWidth="8" />
        {[55, 75, 95, 115, 135, 155].map((y, i) => (
          <circle key={i} cx="35" cy={y} r="6" fill="#1a1a1a" />
        ))}
        <circle cx="35" cy="170" r="8" fill="#FFA500" />

        {/* Saree */}
        <path d="M18 50 L18 195 L52 195 L52 50 Q35 45 18 50" fill="#DAA520" />
        <path d="M18 50 L8 130 L18 195" fill="#DC143C" />
        {/* Saree border */}
        <path d="M18 190 L52 190" stroke="#DC143C" strokeWidth="4" />
        {/* Pallu */}
        <path d="M52 55 Q62 90 58 140" stroke="#DC143C" strokeWidth="10" fill="none" />

        {/* Jewelry */}
        <circle cx="35" cy="48" r="4" fill="#FFD700" />
        <circle cx="18" cy="100" r="5" fill="#FFD700" />
      </g>

      {/* Man */}
      <g transform="translate(75, 0)">
        {/* Hair */}
        <ellipse cx="35" cy="22" rx="20" ry="22" fill="#1a1a1a" />
        {/* Face */}
        <circle cx="35" cy="22" r="17" fill="#C4A06A" />
        {/* Hair top */}
        <path d="M18 22 Q35 5 52 22 Q35 12 18 22" fill="#1a1a1a" />
        {/* Tilak */}
        <path d="M35 15 L32 25 L38 25 Z" fill="#DC143C" />
        {/* Eyes */}
        <ellipse cx="30" cy="23" rx="2" ry="3" fill="#2F1810" />
        <ellipse cx="40" cy="23" rx="2" ry="3" fill="#2F1810" />

        {/* Kurta */}
        <path d="M18 45 L18 110 L52 110 L52 45 Q35 40 18 45" fill="#FFF8DC" />

        {/* Dhoti */}
        <path d="M18 110 L12 195 L58 195 L52 110 Z" fill="#FFFAF0" />
        <path d="M32 110 L30 195" stroke="#F5F5DC" strokeWidth="2" />

        {/* Arms */}
        <path d="M18 55 Q8 80 12 105" stroke="#C4A06A" strokeWidth="6" fill="none" />
        <path d="M52 55 Q62 80 58 105" stroke="#C4A06A" strokeWidth="6" fill="none" />
      </g>

      {/* Puja thali in woman's hands */}
      <g transform="translate(25, 115)">
        <ellipse cx="0" cy="0" rx="15" ry="5" fill="#FFD700" />
        <circle cx="-6" cy="-3" r="4" fill="#DC143C" />
        <circle cx="6" cy="-3" r="4" fill="#FFD700" />
        <circle cx="0" cy="-4" r="3" fill="#32CD32" />
      </g>
    </svg>
  );
}

// Cow with Calf
function CowWithCalf() {
  return (
    <svg width="120" height="130" viewBox="0 0 120 130">
      {/* Cow */}
      <g transform="translate(0, 10)">
        {/* Body */}
        <ellipse cx="45" cy="65" rx="40" ry="28" fill="#F5F5F5" />
        {/* Head */}
        <circle cx="15" cy="48" r="22" fill="#F5F5F5" />
        {/* Ears */}
        <ellipse cx="2" cy="35" rx="8" ry="12" fill="#FFB6C1" />
        <ellipse cx="28" cy="35" rx="8" ry="12" fill="#FFB6C1" />
        {/* Horns */}
        <path d="M8 28 Q2 15 8 8" stroke="#DAA520" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M22 28 Q28 15 22 8" stroke="#DAA520" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Face */}
        <circle cx="8" cy="48" r="3" fill="#2F1810" />
        <circle cx="22" cy="48" r="3" fill="#2F1810" />
        <ellipse cx="15" cy="62" rx="10" ry="7" fill="#FFB6C1" />
        {/* Nostrils */}
        <circle cx="12" cy="62" r="2" fill="#D4A574" />
        <circle cx="18" cy="62" r="2" fill="#D4A574" />
        {/* Legs */}
        <rect x="25" y="88" width="10" height="25" fill="#F5F5F5" rx="3" />
        <rect x="55" y="88" width="10" height="25" fill="#F5F5F5" rx="3" />
        {/* Tail */}
        <path d="M85 60 Q95 80 90 100" stroke="#E5E5E5" strokeWidth="4" fill="none" />
        <ellipse cx="90" cy="102" rx="5" ry="8" fill="#E5E5E5" />
        {/* Spots */}
        <ellipse cx="50" cy="55" rx="8" ry="6" fill="#E8E8E8" />
        <ellipse cx="65" cy="70" rx="6" ry="5" fill="#E8E8E8" />
      </g>

      {/* Calf */}
      <g transform="translate(70, 55)">
        {/* Body */}
        <ellipse cx="22" cy="40" rx="22" ry="18" fill="#FFF8DC" />
        {/* Head */}
        <circle cx="8" cy="28" r="14" fill="#FFF8DC" />
        {/* Ears */}
        <ellipse cx="0" cy="20" rx="5" ry="8" fill="#FFB6C1" />
        <ellipse cx="16" cy="20" rx="5" ry="8" fill="#FFB6C1" />
        {/* Face */}
        <circle cx="4" cy="28" r="2" fill="#2F1810" />
        <circle cx="12" cy="28" r="2" fill="#2F1810" />
        <ellipse cx="8" cy="36" rx="6" ry="4" fill="#FFB6C1" />
        {/* Legs */}
        <rect x="12" y="55" width="6" height="18" fill="#FFF8DC" rx="2" />
        <rect x="30" y="55" width="6" height="18" fill="#FFF8DC" rx="2" />
      </g>
    </svg>
  );
}

// Sparkle particles
function Sparkles({ show }: { show: boolean }) {
  const sparkles = [
    { x: 10, y: 20, size: 3, delay: 0 },
    { x: 90, y: 15, size: 4, delay: 0.5 },
    { x: 15, y: 80, size: 3, delay: 1 },
    { x: 85, y: 75, size: 4, delay: 1.5 },
    { x: 50, y: 10, size: 3, delay: 2 },
    { x: 5, y: 50, size: 2, delay: 2.5 },
    { x: 95, y: 45, size: 2, delay: 3 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${show ? "opacity-100" : "opacity-0"}`}>
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: "2s",
          }}
        >
          <svg width={s.size * 4} height={s.size * 4} viewBox="0 0 20 20">
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#FFD700" opacity="0.6" />
          </svg>
        </div>
      ))}
    </div>
  );
}
