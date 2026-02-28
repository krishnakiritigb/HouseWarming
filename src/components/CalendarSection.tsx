"use client";

import { CONFIG } from "@/config/invite";
import { CustomColors } from "./ThemeSwitcher";

interface CalendarSectionProps {
  colors: CustomColors;
}

export default function CalendarSection({ colors }: CalendarSectionProps) {
  const startDateTime = `${CONFIG.eventDate.replace(/-/g, "")}T${CONFIG.eventTime.replace(":", "")}00`;
  const endDateTime = `${CONFIG.eventDate.replace(/-/g, "")}T${CONFIG.eventEndTime.replace(":", "")}00`;

  const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(CONFIG.eventTitle)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(CONFIG.message)}&location=${encodeURIComponent(CONFIG.address)}`;

  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(CONFIG.eventTitle)}&startdt=${CONFIG.eventDate}T${CONFIG.eventTime}:00&enddt=${CONFIG.eventDate}T${CONFIG.eventEndTime}:00&body=${encodeURIComponent(CONFIG.message)}&location=${encodeURIComponent(CONFIG.address)}`;

  const downloadICS = () => {
    const startDate = CONFIG.eventDate.replace(/-/g, "");
    const startTime = CONFIG.eventTime.replace(":", "") + "00";
    const endTime = CONFIG.eventEndTime.replace(":", "") + "00";

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Housewarming Invite//EN
BEGIN:VEVENT
DTSTART:${startDate}T${startTime}
DTEND:${startDate}T${endTime}
SUMMARY:${CONFIG.eventTitle}
DESCRIPTION:${CONFIG.message}
LOCATION:${CONFIG.address}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "housewarming-invite.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="my-8">
      <h3
        className="font-serif text-xl text-center mb-4"
        style={{ color: colors.primaryText }}
      >
        Don&apos;t Forget!
      </h3>
      <div className="flex flex-col gap-3">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-5 border-2 rounded-xl font-medium transition-all hover:text-white"
          style={{
            borderColor: colors.accentColor,
            color: colors.accentColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.accentColor;
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = colors.accentColor;
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-9 15h-3v-9h3v9zm4.5 0h-3v-6h3v6zm4.5 0h-3v-3h3v3z" />
          </svg>
          Add to Google Calendar
        </a>
        <a
          href={outlookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-5 border-2 rounded-xl font-medium transition-all"
          style={{
            borderColor: colors.headingColor,
            color: colors.headingColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.headingColor;
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = colors.headingColor;
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3H3v18h18V3zm-9 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
          </svg>
          Add to Outlook
        </a>
        <button
          onClick={downloadICS}
          className="flex items-center justify-center gap-2 py-3 px-5 text-white rounded-xl font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
          style={{ backgroundColor: colors.accentColor }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
          </svg>
          Download Calendar File (.ics)
        </button>
      </div>
    </div>
  );
}
