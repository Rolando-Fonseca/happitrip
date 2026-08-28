import { cn } from "@/lib/utils"

/**
 * Wordmark tipográfico. Sustituye a la ilustración original del globo:
 * escala a favicon, se lee en el nav sobre foto y no depende de un PNG.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "titular text-xl leading-none tracking-tight select-none",
        className
      )}
    >
      Happi<span className="text-ambar">Trip</span>
      <span className="text-ambar">.</span>
    </span>
  )
}
