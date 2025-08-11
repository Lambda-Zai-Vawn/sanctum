
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A skeleton loader component that displays a pulsing placeholder.
 * It's used to indicate that content is loading, improving the user experience
 * by providing a visual cue that something is happening.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
