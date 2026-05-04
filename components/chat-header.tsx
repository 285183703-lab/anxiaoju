"use client"

import { MenuSheet } from "@/components/menu-sheet"

type Props = {
  onReset: () => void
}

export function ChatHeader({ onReset }: Props) {
  return (
    <header className="relative z-20 flex h-14 items-center justify-between px-3">
      <MenuSheet />
      <button
        onClick={onReset}
        className="text-lg font-semibold tracking-wide text-foreground transition active:scale-95"
        aria-label="返回首页"
      >
        安小居
      </button>
      <div className="size-10" aria-hidden />
    </header>
  )
}
