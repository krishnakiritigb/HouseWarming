"use client";

import { useState } from "react";
import { CONFIG } from "@/config/invite";

interface AdminPanelProps {
  show: boolean;
  onClose: () => void;
}

export default function AdminPanel({ show, onClose }: AdminPanelProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (username === CONFIG.adminUser && password === CONFIG.adminPass) {
      setIsLoggedIn(true);
      setError("");
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.countapi.xyz/get/${CONFIG.counterNamespace}/${CONFIG.counterKey}`
        );
        const data = await res.json();
        setVisitorCount(data.value || 0);
      } catch {
        setVisitorCount(-1);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Invalid credentials");
    }
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setError("");
    setIsLoggedIn(false);
    setVisitorCount(null);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-[2000] animate-fade-in"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl text-center z-[2001] animate-scale-in min-w-[300px]">
        {!isLoggedIn ? (
          <>
            <h3 className="text-xl text-gray-800 mb-5">Admin Access</h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mb-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 mb-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            />
            <button
              onClick={handleLogin}
              className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Login
            </button>
            {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
          </>
        ) : (
          <>
            <h3 className="text-xl text-gray-800 mb-5">Visitor Statistics</h3>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-xl mb-5">
              <span className="block text-5xl font-bold text-white">
                {loading ? "..." : visitorCount === -1 ? "Error" : visitorCount}
              </span>
              <span className="text-white/80 text-sm">Total Visitors</span>
            </div>
            <button
              onClick={handleClose}
              className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Close
            </button>
          </>
        )}
      </div>
    </>
  );
}
