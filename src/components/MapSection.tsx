import { CONFIG } from "@/config/invite";
import { CustomColors } from "./ThemeSwitcher";

interface MapSectionProps {
  colors: CustomColors;
}

export default function MapSection({ colors }: MapSectionProps) {
  const mapUrl = `https://maps.google.com/maps?q=${CONFIG.latitude},${CONFIG.longitude}&z=17&output=embed`;

  return (
    <div className="my-8">
      <h3
        className="font-serif text-xl text-center mb-4"
        style={{ color: colors.primaryText }}
      >
        Find Us Here
      </h3>
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={mapUrl}
          className="w-full h-64 border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={CONFIG.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mt-3 py-3 text-white text-center rounded-xl font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
        style={{ backgroundColor: colors.accentColor }}
      >
        Get Directions
      </a>
    </div>
  );
}
