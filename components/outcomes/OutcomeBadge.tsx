import { Badge } from "@/components/ui/badge";

export function OutcomeBadge() {
  return (
    <div className="absolute bottom-4 right-4 z-10">
      <Badge
        variant="outline"
        className="rounded-full border-brand/30 bg-brand/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-brand backdrop-blur-sm"
      >
        Sample Outcome
      </Badge>
    </div>
  );
}
