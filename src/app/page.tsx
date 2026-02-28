"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { CONFIG } from "@/config/invite";
import House from "@/components/House";
import EventDetails from "@/components/EventDetails";
import MapSection from "@/components/MapSection";
import CalendarSection from "@/components/CalendarSection";
import SecretMessage from "@/components/SecretMessage";
import AdminPanel from "@/components/AdminPanel";
import Confetti from "@/components/Confetti";
import VideoIntro from "@/components/VideoIntro";

// Set to false to skip the intro animation
const SHOW_INTRO = true;

// Colors for the invite
const COLORS = {
  background: "#fff7ed",
  cardBackground: "#ffffff",
  primaryText: "#1f2937",
  secondaryText: "#6b7280",
  accentColor: "#f97316",
  headingColor: "#ea580c",
};

function InviteContent() {
  const searchParams = useSearchParams();
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; big: boolean }[]>([]);
  const [showIntro, setShowIntro] = useState(SHOW_INTRO);

  const baseName = searchParams.get(CONFIG.paramName) || CONFIG.defaultGuestName;
  const includeFamily = searchParams.get("f") === "1";
  const guestName = includeFamily ? `${baseName} & Family` : baseName;
  const secretCode = searchParams.get(CONFIG.paramCode);
  const isAdmin = searchParams.get("a") === "1";

  const handleHouseClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    const newConfetti = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      big: false,
    }));
    setConfetti((prev) => [...prev, ...newConfetti]);

    if (newCount >= 7) {
      const bigConfetti = Array.from({ length: 100 }, (_, i) => ({
        id: Date.now() + 1000 + i,
        big: true,
      }));
      setConfetti((prev) => [...prev, ...bigConfetti]);
      setTimeout(() => setShowSecret(true), 500);
      setClickCount(0);
    }

    setTimeout(() => {
      setClickCount((c) => (c === newCount ? 0 : c));
    }, 2000);
  };

  const removeConfetti = (id: number) => {
    setConfetti((prev) => prev.filter((c) => c.id !== id));
  };

  const getSecretContent = () => {
    if (secretCode && CONFIG.secretCodes[secretCode]) {
      const secret = CONFIG.secretCodes[secretCode];
      return {
        title: secret.title,
        message: secret.message,
        emoji: secret.emoji,
      };
    }
    return {
      title: CONFIG.defaultSecretTitle,
      message: CONFIG.defaultSecretMessage,
      emoji: "🎉 🎁 🎉",
    };
  };

  // Show intro animation first
  if (showIntro) {
    return <VideoIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="animate-fade-in" style={{ backgroundColor: "#f5e6f0" }}>
      {/* Confetti */}
      {confetti.map((c) => (
        <Confetti key={c.id} big={c.big} onComplete={() => removeConfetti(c.id)} />
      ))}

      {/* Click Counter */}
      {clickCount > 0 && (
        <div
          className="fixed top-5 right-5 text-white px-4 py-2 rounded-full text-sm z-50 animate-pop-in"
          style={{ backgroundColor: COLORS.accentColor }}
        >
          Keep clicking! {clickCount}/7
        </div>
      )}

      {/* Top Section - Welcome & House */}
      <div className="text-center pt-8 pb-4 px-5">
        <p
          className="font-serif text-xl mb-2 animate-fade-in-down"
          style={{ color: COLORS.secondaryText }}
        >
          Welcome
        </p>
        <h1
          className="font-serif text-4xl md:text-5xl font-bold drop-shadow-sm animate-fade-in-down"
          style={{ color: COLORS.headingColor }}
        >
          {guestName}
        </h1>

        {/* House Illustration */}
        <div className="flex flex-col items-center mt-4 animate-pop-in">
          <House onClick={handleHouseClick} accentColor={COLORS.accentColor} />
          <span
            className="text-sm mt-2 animate-gentle-bounce"
            style={{ color: COLORS.secondaryText }}
          >
            Click the house for a surprise!
          </span>
        </div>
      </div>

      {/* Background image section with card */}
      <div
        className="min-h-screen px-5 py-10"
        style={{
          backgroundImage: `url('/Baby Shower.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="max-w-xl mx-auto rounded-3xl p-6 md:p-8 shadow-xl"
          style={{ backgroundColor: COLORS.cardBackground }}
        >
          <h2
            className="font-serif text-2xl md:text-3xl text-center mb-2"
            style={{ color: COLORS.primaryText }}
          >
            You&apos;re Invited!
          </h2>
          <p
            className="text-center mb-6 text-sm"
            style={{ color: COLORS.secondaryText }}
          >
            Join us for a Housewarming Celebration
          </p>

          <EventDetails colors={COLORS} />
          <MapSection colors={COLORS} />
          <CalendarSection colors={COLORS} />

          {/* Host Message */}
          <div
            className="text-center p-6 rounded-2xl mt-6"
            style={{ backgroundColor: `${COLORS.accentColor}15` }}
          >
            <p
              className="italic leading-relaxed"
              style={{ color: COLORS.primaryText }}
            >
              &ldquo;{CONFIG.message}&rdquo;
            </p>
            <p
              className="mt-3 font-semibold text-sm"
              style={{ color: COLORS.headingColor }}
            >
              - {CONFIG.hostNames}
            </p>
          </div>
        </div>
      </div>

      {/* Secret Message Modal */}
      <SecretMessage
        show={showSecret}
        onClose={() => setShowSecret(false)}
        {...getSecretContent()}
      />

      {/* Admin Panel */}
      {isAdmin && <AdminPanel show={showAdmin} onClose={() => setShowAdmin(false)} />}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-orange-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
            <div className="text-orange-500 text-xl font-serif">
              Loading your invitation...
            </div>
          </div>
        </div>
      }
    >
      <InviteContent />
    </Suspense>
  );
}
