"use client"

import { useState, useEffect } from "react"

export function useWindow() {
  const [windowState, setWindowState] = useState({
    isMobile: false,
    width: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowState({
        isMobile: window.innerWidth < 768,
        width: window.innerWidth,
      })
    }

    // Initial call
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowState
}
