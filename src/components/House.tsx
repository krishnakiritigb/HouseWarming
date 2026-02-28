"use client";

interface HouseProps {
  onClick: () => void;
  accentColor?: string;
}

export default function House({ onClick, accentColor = "#f97316" }: HouseProps) {
  return (
    <div className="relative animate-float">
      <svg
        className="house-svg"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        onClick={onClick}
      >
        {/* Smoke from chimney */}
        <g className="house-smoke">
          <circle cx="152" cy="10" r="6" fill="#9ca3af" opacity="0.4" />
          <circle cx="148" cy="18" r="5" fill="#9ca3af" opacity="0.3" />
          <circle cx="155" cy="25" r="4" fill="#9ca3af" opacity="0.2" />
        </g>
        <g className="house-smoke" style={{ animationDelay: "1s" }}>
          <circle cx="158" cy="8" r="5" fill="#9ca3af" opacity="0.3" />
          <circle cx="154" cy="15" r="4" fill="#9ca3af" opacity="0.25" />
        </g>
        <g className="house-smoke" style={{ animationDelay: "2s" }}>
          <circle cx="150" cy="12" r="4" fill="#9ca3af" opacity="0.35" />
          <circle cx="156" cy="20" r="3" fill="#9ca3af" opacity="0.2" />
        </g>

        {/* Roof with gradient */}
        <defs>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>
          <linearGradient id="windowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Roof */}
        <polygon points="100,30 10,100 190,100" fill="url(#roofGradient)" />
        <polygon points="100,30 10,100 100,100" fill={accentColor} opacity="0.7" />

        {/* Chimney */}
        <rect x="140" y="45" width="25" height="40" fill="#7f8c8d" />
        <rect x="137" y="40" width="31" height="8" fill="#95a5a6" />

        {/* House Body */}
        <rect x="25" y="100" width="150" height="90" fill="url(#houseGradient)" />

        {/* Door */}
        <rect x="80" y="130" width="40" height="60" fill="#7c3aed" rx="3" />
        <rect x="85" y="135" width="30" height="50" fill="#8b5cf6" rx="2" />

        {/* Door knob with glow */}
        <circle
          cx="108"
          cy="160"
          r="4"
          fill="#fbbf24"
          className="house-door-knob"
          filter="url(#glow)"
        />

        {/* Windows with warm glow */}
        <g className="house-window">
          <rect x="40" y="120" width="30" height="30" fill="url(#windowGlow)" rx="2" filter="url(#glow)" />
          <line x1="55" y1="120" x2="55" y2="150" stroke="white" strokeWidth="2" />
          <line x1="40" y1="135" x2="70" y2="135" stroke="white" strokeWidth="2" />
        </g>
        <g className="house-window" style={{ animationDelay: "1.5s" }}>
          <rect x="130" y="120" width="30" height="30" fill="url(#windowGlow)" rx="2" filter="url(#glow)" />
          <line x1="145" y1="120" x2="145" y2="150" stroke="white" strokeWidth="2" />
          <line x1="130" y1="135" x2="160" y2="135" stroke="white" strokeWidth="2" />
        </g>

        {/* Welcome Mat */}
        <rect x="75" y="185" width="50" height="10" fill="#22c55e" rx="2" />
        <text x="100" y="193" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">
          WELCOME
        </text>

        {/* Heart on door with heartbeat animation */}
        <g className="house-heart">
          <path
            d="M100,145 C100,142 97,140 94,140 C90,140 88,144 88,147 C88,153 100,160 100,160 C100,160 112,153 112,147 C112,144 110,140 106,140 C103,140 100,142 100,145"
            fill={accentColor}
          />
        </g>

        {/* Decorative bushes */}
        <ellipse cx="35" cy="188" rx="15" ry="10" fill="#16a34a" />
        <ellipse cx="165" cy="188" rx="15" ry="10" fill="#16a34a" />
        <ellipse cx="25" cy="185" rx="10" ry="8" fill="#22c55e" />
        <ellipse cx="175" cy="185" rx="10" ry="8" fill="#22c55e" />

        {/* Flowers */}
        <circle cx="20" cy="180" r="3" fill="#ec4899" />
        <circle cx="30" cy="182" r="3" fill="#f472b6" />
        <circle cx="170" cy="180" r="3" fill="#ec4899" />
        <circle cx="180" cy="182" r="3" fill="#f472b6" />
      </svg>

      {/* Sparkles around house */}
      <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-yellow-400 animate-pulse opacity-60" />
      <div className="absolute top-10 -right-3 w-2 h-2 rounded-full bg-yellow-300 animate-pulse opacity-50" style={{ animationDelay: "0.5s" }} />
      <div className="absolute -bottom-1 left-5 w-2 h-2 rounded-full bg-orange-400 animate-pulse opacity-50" style={{ animationDelay: "1s" }} />
    </div>
  );
}
