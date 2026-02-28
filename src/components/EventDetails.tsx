import { CONFIG } from "@/config/invite";
import { CustomColors } from "./ThemeSwitcher";

interface EventDetailsProps {
  colors: CustomColors;
}

export default function EventDetails({ colors }: EventDetailsProps) {
  return (
    <div className="mb-6">
      {/* Date & Time in a row */}
      <div className="flex gap-3 mb-3">
        <div
          className="flex-1 flex items-center gap-2 p-3 rounded-xl"
          style={{ backgroundColor: `${colors.accentColor}10` }}
        >
          <span className="text-lg">📅</span>
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: colors.secondaryText }}>Date</p>
            <p className="text-sm font-medium" style={{ color: colors.primaryText }}>{CONFIG.eventDisplayDate}</p>
          </div>
        </div>
        <div
          className="flex-1 flex items-center gap-2 p-3 rounded-xl"
          style={{ backgroundColor: `${colors.accentColor}10` }}
        >
          <span className="text-lg">🕓</span>
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: colors.secondaryText }}>Time</p>
            <p className="text-sm font-medium" style={{ color: colors.primaryText }}>{CONFIG.eventDisplayTime}</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div
        className="flex items-center gap-2 p-3 rounded-xl"
        style={{ backgroundColor: `${colors.accentColor}10` }}
      >
        <span className="text-lg">📍</span>
        <div>
          <p className="text-xs uppercase tracking-wider" style={{ color: colors.secondaryText }}>Venue</p>
          <p className="text-sm font-medium" style={{ color: colors.primaryText }}>{CONFIG.address}</p>
        </div>
      </div>
    </div>
  );
}
