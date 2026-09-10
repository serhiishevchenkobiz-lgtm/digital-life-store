import { cn } from "@/lib/utils";

type Palette = "ember" | "moss" | "ink" | "sand" | "inkwell" | "rose";
type Motif = "compass" | "lamp" | "wave" | "leaf" | "arch" | "sun";

const palettes: Record<Palette, { base: string; ink: string; accent: string }> = {
  ember: { base: "#D95F34", ink: "#FFF9F2", accent: "#FFD4AB" },
  moss: { base: "#38594A", ink: "#F7F6EE", accent: "#C4D5A6" },
  ink: { base: "#14211F", ink: "#FBF9F2", accent: "#E46B3C" },
  sand: { base: "#E6D19D", ink: "#1D3932", accent: "#C36139" },
  inkwell: { base: "#244F68", ink: "#F6FAF6", accent: "#E5C65E" },
  rose: { base: "#8B4557", ink: "#FFF7F2", accent: "#FFBDA9" },
};

function MotifSVG({ motif, color }: { motif: Motif; color: string }) {
  switch (motif) {
    case "compass": return <g stroke={color} strokeWidth="1.4" fill="none"><circle cx="100" cy="160" r="52"/><circle cx="100" cy="160" r="36"/><path d="M100 108 L112 160 L100 212 L88 160 Z" fill={color} opacity="0.85"/><path d="M48 160 L152 160" strokeOpacity="0.4"/></g>;
    case "lamp": return <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"><path d="M70 110 L130 110 L118 168 L82 168 Z"/><path d="M100 168 L100 200"/><path d="M76 208 L124 208"/><path d="M100 80 L100 100"/></g>;
    case "wave": return <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"><path d="M40 170 Q70 140 100 170 T160 170"/><path d="M40 190 Q70 160 100 190 T160 190" opacity="0.6"/><path d="M40 210 Q70 180 100 210 T160 210" opacity="0.4"/></g>;
    case "leaf": return <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"><path d="M100 96 C 140 120, 140 200, 100 224 C 60 200, 60 120, 100 96 Z"/><path d="M100 96 L100 224"/><path d="M100 130 L130 150" opacity="0.6"/><path d="M100 160 L70 180" opacity="0.6"/></g>;
    case "arch": return <g stroke={color} strokeWidth="1.4" fill="none"><path d="M50 210 L50 130 Q50 80 100 80 Q150 80 150 130 L150 210"/><path d="M50 210 L150 210"/><path d="M100 80 L100 210" opacity="0.5"/></g>;
    case "sun": return <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"><circle cx="100" cy="160" r="30"/><path d="M100 110 L100 96"/><path d="M100 224 L100 210"/><path d="M50 160 L64 160"/><path d="M150 160 L136 160"/><path d="M66 126 L76 136"/><path d="M134 194 L124 184"/><path d="M66 194 L76 184"/><path d="M134 126 L124 136"/></g>;
  }
}

export function BookCover({ palette, motif, spineLabel, title, className, ariaLabel }: { palette: Palette; motif: Motif; spineLabel: string; title: string; className?: string; ariaLabel?: string }) {
  const p = palettes[palette];
  const titleLines = title.split(" ").reduce<string[]>((lines, word) => {
    const last = lines.at(-1) ?? "";
    if (`${last} ${word}`.trim().length > 15) lines.push(word); else lines[lines.length - 1] = `${last} ${word}`.trim();
    return lines;
  }, [""]);

  return (
    <svg viewBox="0 0 200 280" role="img" aria-label={ariaLabel ?? `${title} cover`} className={cn("block w-full h-auto rounded-md shadow-soft transition-transform duration-300 ease-editorial will-change-transform", className)}>
      <rect width="200" height="280" rx="4" fill={p.base}/>
      <rect x="12" y="12" width="176" height="256" rx="2" fill="none" stroke={p.ink} strokeOpacity="0.35"/>
      <rect x="0" y="0" width="7" height="280" fill="rgba(0,0,0,0.2)"/>
      <text x="22" y="32" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="1.7" fill={p.ink} opacity="0.82">DIGITAL EDITION</text>
      <text x="178" y="32" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="1.4" fill={p.ink} opacity="0.72">{spineLabel}</text>
      <g transform="translate(0 -2) scale(1.05)"><MotifSVG motif={motif} color={p.ink}/></g>
      <rect x="16" y="196" width="168" height="52" fill={p.base} fillOpacity="0.92"/>
      <text x="22" y="216" fontFamily="Fraunces, serif" fontSize="16" fill={p.ink}>{titleLines.slice(0, 2).map((line, index) => <tspan key={line} x="22" dy={index === 0 ? 0 : 18}>{line}</tspan>)}</text>
    </svg>
  );
}
