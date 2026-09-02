import { cn } from "@/lib/utils";

type Palette = "ember" | "moss" | "ink" | "sand" | "inkwell" | "rose";
type Motif = "compass" | "lamp" | "wave" | "leaf" | "arch" | "sun";

const palettes: Record<Palette, { base: string; ink: string; accent: string; glow: string }> = {
  ember: { base: "#B23A2F", ink: "#F6F2EA", accent: "#F2C7A5", glow: "rgba(242,199,165,0.35)" },
  moss: { base: "#3F5B3A", ink: "#F6F2EA", accent: "#C7D6B6", glow: "rgba(199,214,182,0.35)" },
  ink: { base: "#1A1714", ink: "#F6F2EA", accent: "#B23A2F", glow: "rgba(178,58,47,0.35)" },
  sand: { base: "#D9C9A3", ink: "#1A1714", accent: "#8E2A22", glow: "rgba(26,23,20,0.18)" },
  inkwell: { base: "#2B3A55", ink: "#F6F2EA", accent: "#E2C58F", glow: "rgba(226,197,143,0.35)" },
  rose: { base: "#A85A6B", ink: "#F6F2EA", accent: "#F0D7C6", glow: "rgba(240,215,198,0.35)" },
};

function MotifSVG({ motif, color }: { motif: Motif; color: string }) {
  switch (motif) {
    case "compass":
      return (
        <g stroke={color} strokeWidth="1.4" fill="none">
          <circle cx="100" cy="160" r="52" />
          <circle cx="100" cy="160" r="36" />
          <path d="M100 108 L112 160 L100 212 L88 160 Z" fill={color} opacity="0.85" />
          <path d="M48 160 L152 160" strokeOpacity="0.4" />
        </g>
      );
    case "lamp":
      return (
        <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M70 110 L130 110 L118 168 L82 168 Z" />
          <path d="M100 168 L100 200" />
          <path d="M76 208 L124 208" />
          <path d="M100 80 L100 100" />
        </g>
      );
    case "wave":
      return (
        <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M40 170 Q70 140 100 170 T160 170" />
          <path d="M40 190 Q70 160 100 190 T160 190" opacity="0.6" />
          <path d="M40 210 Q70 180 100 210 T160 210" opacity="0.4" />
        </g>
      );
    case "leaf":
      return (
        <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M100 96 C 140 120, 140 200, 100 224 C 60 200, 60 120, 100 96 Z" />
          <path d="M100 96 L100 224" />
          <path d="M100 130 L130 150" opacity="0.6" />
          <path d="M100 160 L70 180" opacity="0.6" />
        </g>
      );
    case "arch":
      return (
        <g stroke={color} strokeWidth="1.4" fill="none">
          <path d="M50 210 L50 130 Q50 80 100 80 Q150 80 150 130 L150 210" />
          <path d="M50 210 L150 210" />
          <path d="M100 80 L100 210" opacity="0.5" />
        </g>
      );
    case "sun":
      return (
        <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round">
          <circle cx="100" cy="160" r="30" />
          <path d="M100 110 L100 96" />
          <path d="M100 224 L100 210" />
          <path d="M50 160 L64 160" />
          <path d="M150 160 L136 160" />
          <path d="M66 126 L76 136" />
          <path d="M134 194 L124 184" />
          <path d="M66 194 L76 184" />
          <path d="M134 126 L124 136" />
        </g>
      );
  }
}

export function BookCover({
  palette,
  motif,
  spineLabel,
  title,
  className,
  ariaLabel,
}: {
  palette: Palette;
  motif: Motif;
  spineLabel: string;
  title: string;
  className?: string;
  ariaLabel?: string;
}) {
  const p = palettes[palette];

  return (
    <svg
      viewBox="0 0 200 280"
      role="img"
      aria-label={ariaLabel ?? `${title} cover`}
      className={cn(
        "block w-full h-auto rounded-md shadow-soft transition-transform duration-300 ease-editorial will-change-transform",
        className,
      )}
    >
      <defs>
        <linearGradient id={`grad-${palette}-${motif}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.base} />
          <stop offset="100%" stopColor={p.base} stopOpacity="0.92" />
        </linearGradient>
        <radialGradient id={`glow-${palette}-${motif}`} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor={p.glow} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="200" height="280" rx="6" fill={`url(#grad-${palette}-${motif})`} />
      <rect width="200" height="280" rx="6" fill={`url(#glow-${palette}-${motif})`} />
      <rect x="0" y="0" width="6" height="280" fill="rgba(0,0,0,0.25)" />
      <g transform="translate(0 0)">
        <MotifSVG motif={motif} color={p.ink} />
      </g>
      <text
        x="100"
        y="42"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="11"
        letterSpacing="3"
        fill={p.ink}
        opacity="0.7"
      >
        {spineLabel}
      </text>
      <text
        x="16"
        y="264"
        fontFamily="Fraunces, serif"
        fontSize="13"
        fill={p.ink}
        opacity="0.85"
      >
        Digital Life Press
      </text>
    </svg>
  );
}