// ============================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================

// Color Themes - Choose one or create your own!
export const COLOR_THEMES = {
  warmSunset: {
    name: "Warm Sunset",
    primary: "#f97316", // orange-500
    primaryLight: "#fed7aa", // orange-200
    primaryDark: "#c2410c", // orange-700
    secondary: "#f59e0b", // amber-500
    accent: "#ef4444", // red-500
    background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)",
    cardBg: "#ffffff",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    textAccent: "#b45309",
  },
  elegantRose: {
    name: "Elegant Rose",
    primary: "#ec4899", // pink-500
    primaryLight: "#fbcfe8", // pink-200
    primaryDark: "#be185d", // pink-700
    secondary: "#f472b6", // pink-400
    accent: "#a855f7", // purple-500
    background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)",
    cardBg: "#ffffff",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    textAccent: "#9d174d",
  },
  forestGreen: {
    name: "Forest Green",
    primary: "#22c55e", // green-500
    primaryLight: "#bbf7d0", // green-200
    primaryDark: "#15803d", // green-700
    secondary: "#84cc16", // lime-500
    accent: "#14b8a6", // teal-500
    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
    cardBg: "#ffffff",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    textAccent: "#166534",
  },
  oceanBlue: {
    name: "Ocean Blue",
    primary: "#3b82f6", // blue-500
    primaryLight: "#bfdbfe", // blue-200
    primaryDark: "#1d4ed8", // blue-700
    secondary: "#06b6d4", // cyan-500
    accent: "#8b5cf6", // violet-500
    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)",
    cardBg: "#ffffff",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    textAccent: "#1e40af",
  },
  royalPurple: {
    name: "Royal Purple",
    primary: "#8b5cf6", // violet-500
    primaryLight: "#ddd6fe", // violet-200
    primaryDark: "#6d28d9", // violet-700
    secondary: "#a78bfa", // violet-400
    accent: "#ec4899", // pink-500
    background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)",
    cardBg: "#ffffff",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    textAccent: "#5b21b6",
  },
  goldenLuxe: {
    name: "Golden Luxe",
    primary: "#eab308", // yellow-500
    primaryLight: "#fef08a", // yellow-200
    primaryDark: "#a16207", // yellow-700
    secondary: "#f59e0b", // amber-500
    accent: "#d97706", // amber-600
    background: "linear-gradient(135deg, #fefce8 0%, #fef9c3 50%, #fef08a 100%)",
    cardBg: "#ffffff",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    textAccent: "#92400e",
  },
};

// ⬇️ CHANGE THIS TO SWITCH THEMES ⬇️
export const ACTIVE_THEME: keyof typeof COLOR_THEMES = "warmSunset";

export const CONFIG = {
  // Event Details
  eventTitle: "Gruhapravesham",
  eventDate: "2026-03-05", // Format: YYYY-MM-DD
  eventTime: "10:00", // Format: HH:MM (24-hour)
  eventEndTime: "21:00", // Format: HH:MM (24-hour)
  eventDisplayDate: "Thursday, March 5, 2026",
  eventDisplayTime: "10:00 AM onwards",

  // Location
  address:
    "14-127, Sanjeevaiah Nagar Colony, Bowenpally, Secunderabad, Hyderabad, Telangana 500011",
  latitude: 17.4612769,
  longitude: 78.4735397,
  mapsLink: "https://maps.app.goo.gl/FxzHRs3RymrF78HB6",

  // Host Details
  hostNames: "Radhika & Bhasker Gunukuntla",

  // Personal Message
  message:
    "We've finally found our little corner of the world, and it wouldn't feel complete without celebrating with you. Come share in our joy!",

  // Default guest name (used if no URL parameter)
  defaultGuestName: "Friend",

  // Default secret message (shown after easter egg)
  defaultSecretTitle: "You Found It!",
  defaultSecretMessage: "You're officially a VIP guest!",

  // URL Parameter Names (non-obvious for privacy)
  paramName: "t", // guest name
  paramCode: "c", // secret code

  // Admin credentials (change these!)
  adminUser: "radhika",
  adminPass: "housewarming2025",
  // Access admin panel by adding ?a=1 to URL

  // Counter namespace (unique identifier for your counter)
  counterNamespace: "radhika-bhasker-housewarming",
  counterKey: "visitors",

  // Secret codes - add your own! Keep these private
  // Usage: ?t=Sarah&c=m4
  secretCodes: {
    m4: {
      title: "You're Specially Invited!",
      message: "You are also invited for the special ceremony on March 4th, 2026!",
      emoji: "🎉 🌟 🎉",
    },
    vip: {
      title: "VIP Guest!",
      message: "You're on the exclusive guest list! Join us on March 4th, 2026 as well for a special ceremony.",
      emoji: "⭐ 🎉 ⭐",
    },
    fam: {
      title: "Family First!",
      message: "Family gets the best welcome! You're invited on March 4th, 2026 too!",
      emoji: "💕 🏠 💕",
    },
  } as Record<string, { title: string; message: string; emoji: string }>,
};
