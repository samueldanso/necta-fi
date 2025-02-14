"use client"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "#111111",
  gradientBackgroundEnd = "#111111",
  firstColor = "242, 150, 0", // #F29600
  secondColor = "244, 111, 3", // #F46F03
  thirdColor = "242, 150, 0", // #F29600
  fourthColor = "244, 111, 3", // #F46F03
  fifthColor = "242, 150, 0", // #F29600
  pointerColor = "244, 111, 3", // #F46F03
  size = "80%",
  blendingValue = "screen",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  children?: React.ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null)

  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX, setTgX] = useState(0)
  const [tgY, setTgY] = useState(0)
  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart,
    )
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd,
    )
    document.body.style.setProperty("--first-color", firstColor)
    document.body.style.setProperty("--second-color", secondColor)
    document.body.style.setProperty("--third-color", thirdColor)
    document.body.style.setProperty("--fourth-color", fourthColor)
    document.body.style.setProperty("--fifth-color", fifthColor)
    document.body.style.setProperty("--pointer-color", pointerColor)
    document.body.style.setProperty("--size", size)
    document.body.style.setProperty("--blending-value", blendingValue)
  }, [])

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return
      }
      setCurX(curX + (tgX - curX) / 20)
      setCurY(curY + (tgY - curY) / 20)
      interactiveRef.current.style.transform = `translate(${Math.round(
        curX,
      )}px, ${Math.round(curY)}px)`
    }

    move()
  }, [tgX, tgY])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect()
      setTgX(event.clientX - rect.left)
      setTgY(event.clientY - rect.top)
    }
  }

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  return (
    <div
      className={cn(
        "relative top-0 left-0 h-screen w-screen overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName,
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" mode="normal" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-xl" : "[filter:url(#blurMe)_blur(20px)]",
        )}
      >
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.18)_0,_rgba(var(--first-color),_0)_40%)_no-repeat]",
            "top-[calc(40%-var(--size)/2)] left-[calc(65%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:center_center]",
            "animate-first",
            "opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.18)_0,_rgba(var(--second-color),_0)_40%)_no-repeat]",
            "top-[calc(45%-var(--size)/2)] left-[calc(35%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:calc(50%-400px)]",
            "animate-second",
            "opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.18)_0,_rgba(var(--third-color),_0)_40%)_no-repeat]",
            "top-[calc(35%-var(--size)/2)] left-[calc(70%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:calc(50%+400px)]",
            "animate-third",
            "opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.18)_0,_rgba(var(--fourth-color),_0)_40%)_no-repeat]",
            "top-[calc(42%-var(--size)/2)] left-[calc(30%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:calc(50%-200px)]",
            "animate-fourth",
            "opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.18)_0,_rgba(var(--fifth-color),_0)_40%)_no-repeat]",
            "top-[calc(38%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:calc(50%-800px)_calc(50%+800px)]",
            "animate-fifth",
            "opacity-100",
          )}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.15)_0,_rgba(var(--pointer-color),_0)_40%)_no-repeat]",
              "-top-1/2 -left-1/2 h-full w-full [mix-blend-mode:var(--blending-value)]",
              "opacity-80",
            )}
          />
        )}
      </div>
    </div>
  )
}
