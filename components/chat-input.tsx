"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"

type Props = {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("")

  function submit(e?: FormEvent) {
    e?.preventDefault()
    const v = value.trim()
    if (!v || disabled) return
    onSend(v)
    setValue("")
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50">
      <div className="max-w-2xl mx-auto px-6 pb-4">
        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-3">
          <button className="whitespace-nowrap px-5 py-2.5 rounded-full glass-card bg-white/70 border-white/60 text-[13px] font-bold  flex items-center gap-2 flex-0.33 justify-center active:scale-95 transition-transform inner-glow">
            <span className="material-symbols-outlined text-[18px] text-on-surface">edit_square</span>诉求上报
          </button>
          <button className="whitespace-nowrap px-5 py-2.5 rounded-full glass-card bg-white/70 border-white/60 text-[13px] font-bold  flex items-center gap-2 flex-0.33 justify-center active:scale-95 transition-transform inner-glow">
            <span className="material-symbols-outlined text-[18px] text-on-surface">manage_search</span>诉求查询
          </button>
  
        </div>

        {/* Capsule Input Area */}
        <div className="relative mb-2">
          <div className="glass-input rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/80 p-2 flex items-center inner-glow">
            <div className="flex-1 px-4">
              <textarea
                rows={1}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="与安小居对话..."
                className="block max-h-32 w-full resize-none bg-transparent text-on-surface placeholder:text-[#727785]/40 text-[16px] font-medium focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={disabled || !value.trim()}
              onClick={submit}
              className="w-12 h-12 rounded-full bg-[#3d8bff] text-white flex items-center justify-center shadow-lg shadow-[#3d8bff]/25 hover:brightness-110 active:scale-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[24px] text-white">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
