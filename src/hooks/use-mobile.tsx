
import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * A custom hook to determine if the current viewport is a mobile device.
 * It uses a fixed breakpoint of 768px to determine the mobile state.
 * @returns {boolean | undefined} `true` if the viewport width is less than 768px, `false` otherwise. Returns `undefined` during server-side rendering.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
