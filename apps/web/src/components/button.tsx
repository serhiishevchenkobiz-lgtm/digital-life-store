import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2";
  const styles: Record<Variant, string> = {
    primary: "bg-ink text-paper hover:bg-ink-soft",
    outline:
      "border border-ink/15 bg-paper-bright text-ink hover:border-ink/40 hover:bg-paper",
    ghost: "text-ink hover:bg-muted/40",
  };
  const cls = cn(base, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls}>
      {children}
    </button>
  );
}