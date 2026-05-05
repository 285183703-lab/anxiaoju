"use client"

import { useEffect, useRef } from "react"

export function EnergyBall({ size = 160 }: { size?: number }) {
  const eyesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationId: number

    function animate(time: number) {
      const t = time * 0.001
      const floatX = Math.sin(t * 1.5) * 2
      const floatY = Math.cos(t * 1.0) * 4

      if (eyesRef.current) {
        eyesRef.current.style.transform = `translate(-50%, -50%) translate(${floatX}px, ${floatY}px)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "120%",
          height: "120%",
          filter: "blur(25px)",
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.9) 0%, transparent 40%),
            radial-gradient(circle at 45% 40%, rgba(131, 56, 255, 0.8) 0%, transparent 55%),
            radial-gradient(circle at 75% 65%, rgba(220, 120, 255, 0.7) 0%, transparent 55%),
            radial-gradient(circle at 30% 70%, rgba(120, 160, 255, 0.7) 0%, transparent 50%),
            radial-gradient(circle at 60% 20%, rgba(100, 100, 255, 0.5) 0%, transparent 40%)
          `,
          animation: "swirl 20s ease-in-out infinite alternate",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          pointerEvents: "none",
          boxShadow: `
            inset 0 0 15px 8px rgba(255, 255, 255, 0.9),
            inset 0 0 40px 15px rgba(255, 255, 255, 0.6)
          `,
          boxSizing: "border-box",
        }}
      />

      <div
        ref={eyesRef}
        className="absolute flex"
        style={{
          top: "48%",
          left: "50%",
          gap: `${size * 0.16}px`,
          zIndex: 10,
        }}
      >
        {[1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: size * 0.08,
              height: size * 0.26,
              backgroundColor: "#ffffff",
              borderRadius: `${size * 0.04}px`,
              boxShadow: "0 0 12px 1px rgba(255, 255, 255, 0.9)",
              animation: "blink 4.5s infinite",
            }}
          />
        ))}
      </div>
    </div>
  )
}
