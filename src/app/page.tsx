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

      {/* Click Counter - Fixed position feedback */}
      {clickCount > 0 && (
        <div
          className="fixed top-3 right-3 sm:top-5 sm:right-5 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm z-50 animate-pop-in shadow-lg"
          style={{ backgroundColor: COLORS.accentColor }}
          role="status"
          aria-live="polite"
        >
          Keep clicking! {clickCount}/7
        </div>
      )}

      {/* Welcome Section */}
      <header className="text-center pt-6 sm:pt-8 md:pt-2 pb-3 sm:pb-4 md:pb-1 px-4 sm:px-5">
        <p
          className="font-serif text-lg sm:text-xl mb-1 sm:mb-2 animate-fade-in-down"
          style={{ color: COLORS.secondaryText }}
        >
          Welcome
        </p>
        <h1
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-sm animate-fade-in-down leading-tight"
          style={{ color: COLORS.headingColor }}
        >
          {guestName}
        </h1>

        {/* House Illustration - Interactive Element */}
        <div className="flex flex-col items-center mt-3 sm:mt-4 md:mt-1 animate-pop-in md:scale-[0.65] lg:scale-70">
          <House onClick={handleHouseClick} accentColor={COLORS.accentColor} />
          <span
            className="text-xs sm:text-sm mt-2 animate-gentle-bounce"
            style={{ color: COLORS.secondaryText }}
          >
            Click the house for a surprise!
          </span>
        </div>
      </header>

      {/* ===== MOBILE LAYOUT (< md) ===== */}
      <div className="md:hidden">
        {/* Ganesha header decoration */}
        <div
          className="w-full overflow-hidden"
          role="img"
          aria-label="Decorative header with Lord Ganesha and traditional ornaments"
        >
          <img
            src="/Baby Shower.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            className="w-full object-cover object-top h-[200px] sm:h-[240px]"
          />
        </div>

        {/* Main Content Card */}
        <section
          className="px-3 sm:px-4 py-6"
          style={{
            backgroundColor: "#faf5f5",
            backgroundImage: "linear-gradient(to bottom, #f8f0f0, #faf8f8)",
          }}
          aria-labelledby="invite-heading-mobile"
        >
          <div
            className="w-full max-w-xl mx-auto rounded-3xl p-4 sm:p-5 shadow-xl"
            style={{ backgroundColor: COLORS.cardBackground }}
          >
            <h2
              id="invite-heading-mobile"
              className="font-serif text-xl sm:text-2xl text-center mb-2"
              style={{ color: COLORS.primaryText }}
            >
              You&apos;re Invited!
            </h2>
            <p
              className="text-center mb-4 text-xs sm:text-sm"
              style={{ color: COLORS.secondaryText }}
            >
              Join us for a Housewarming Celebration
            </p>

            <EventDetails colors={COLORS} />
            <MapSection colors={COLORS} />
            <CalendarSection colors={COLORS} />

            {/* Host Message */}
            <div
              className="text-center p-3 sm:p-4 rounded-2xl mt-4"
              style={{ backgroundColor: `${COLORS.accentColor}15` }}
            >
              <p
                className="italic leading-relaxed text-xs sm:text-sm"
                style={{ color: COLORS.primaryText }}
              >
                &ldquo;{CONFIG.message}&rdquo;
              </p>
              <p
                className="mt-2 font-semibold text-xs sm:text-sm"
                style={{ color: COLORS.headingColor }}
              >
                - {CONFIG.hostNames}
              </p>
            </div>
          </div>
        </section>

        {/* Krishna footer decoration */}
        <div
          className="w-full overflow-hidden"
          role="img"
          aria-label="Decorative footer with Baby Krishna and lotus flowers"
        >
          <img
            src="/Baby Shower.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full object-cover object-bottom h-[220px] sm:h-[260px]"
          />
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT (>= md) ===== */}
      <div className="hidden md:block">
        {/* Ganesha header decoration - larger for desktop */}
        <div
          className="w-full overflow-hidden"
          role="img"
          aria-label="Decorative header with Lord Ganesha and traditional ornaments"
        >
          <img
            src="/Baby Shower.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            className="w-full object-cover object-top h-[380px] lg:h-[450px] xl:h-[520px]"
          />
        </div>

        {/* Main Content Card */}
        <section
          className="px-6 lg:px-8 py-10 lg:py-12"
          style={{
            backgroundColor: "#faf5f5",
            backgroundImage: "linear-gradient(to bottom, #f8f0f0, #faf8f8)",
          }}
          aria-labelledby="invite-heading-desktop"
        >
          <div
            className="w-full max-w-2xl mx-auto rounded-3xl p-8 lg:p-10 shadow-xl"
            style={{ backgroundColor: COLORS.cardBackground }}
          >
            <h2
              id="invite-heading-desktop"
              className="font-serif text-3xl lg:text-4xl text-center mb-3"
              style={{ color: COLORS.primaryText }}
            >
              You&apos;re Invited!
            </h2>
            <p
              className="text-center mb-6 text-base lg:text-lg"
              style={{ color: COLORS.secondaryText }}
            >
              Join us for a Housewarming Celebration
            </p>

            <EventDetails colors={COLORS} />
            <MapSection colors={COLORS} />
            <CalendarSection colors={COLORS} />

            {/* Host Message */}
            <div
              className="text-center p-6 lg:p-8 rounded-2xl mt-6"
              style={{ backgroundColor: `${COLORS.accentColor}15` }}
            >
              <p
                className="italic leading-relaxed text-base lg:text-lg"
                style={{ color: COLORS.primaryText }}
              >
                &ldquo;{CONFIG.message}&rdquo;
              </p>
              <p
                className="mt-3 font-semibold text-base lg:text-lg"
                style={{ color: COLORS.headingColor }}
              >
                - {CONFIG.hostNames}
              </p>
            </div>
          </div>
        </section>

        {/* Krishna footer decoration - larger for desktop */}
        <div
          className="w-full overflow-hidden"
          role="img"
          aria-label="Decorative footer with Baby Krishna and lotus flowers"
        >
          <img
            src="/Baby Shower.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full object-cover object-bottom h-[450px] lg:h-[520px] xl:h-[600px]"
          />
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
