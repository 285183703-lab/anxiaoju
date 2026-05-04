"use client"

import { MenuSheet } from "@/components/menu-sheet"

type Props = {
  onReset: () => void
}

export function ChatHeader({ onReset }: Props) {
  return (
    <header className="glass-header fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <MenuSheet />
          <div className="flex flex-col">
            <h1 className="font-bold text-[17px] leading-tight text-[#1b1c1a] tracking-tight">
              安小居
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot bg-[#3d8bff]"></span>
              <span className="text-[10px] text-[#424754]/60 font-semibold tracking-wide uppercase">
                安小居 正在倾听...
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-white/40 text-[#424754] transition-colors">
            <span className="material-symbols-outlined text-[20px] text-[#424754]">volume_up</span>
          </button>
          <button className="p-2 rounded-full hover:bg-white/40 text-[#424754] transition-colors">
            <span className="material-symbols-outlined text-[20px] text-[#424754]">more_horiz</span>
          </button>
        </div>
      </div>
    </header>
  )
}
