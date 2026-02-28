"use client";

import { useState, useRef, useEffect } from "react";

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [started, setStarted] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (started) {
      const skipTimer = setTimeout(() => setShowSkip(true), 2000);
      return () => clearTimeout(skipTimer);
    }
  }, [started]);

  const handleStart = () => {
    setStarted(true);
  };

  useEffect(() => {
    if (started && videoRef.current) {
      videoRef.current.playbackRate = 0.7;
      videoRef.current.play().catch((err) => {
        console.error("Playback error:", err);
      });
    }
  }, [started]);

  const handleVideoEnd = () => {
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  if (!started) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <button
          onClick={handleStart}
          className="flex flex-col items-center gap-6 text-white cursor-pointer group"
        >
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:scale-110">
            <svg
              className="w-12 h-12 text-white ml-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-xl font-serif">Tap to Play</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-full object-contain"
        style={{
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        <source src="/AnimationVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showSkip && (
        <button
          onClick={onComplete}
          className="fixed bottom-6 right-6 px-5 py-2.5 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all hover:scale-105 text-sm font-medium z-50"
        >
          Skip →
        </button>
      )}
    </div>
  );
}
