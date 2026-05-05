"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { HistoryList } from "@/components/history-list"
import type { ChatSession } from "@/lib/chat-history"

type Props = {
  onSelectHistory?: (session: ChatSession) => void
  onNewChat?: () => void
}

export function ChatHeader({ onSelectHistory, onNewChat }: Props) {
  const [showHistory, setShowHistory] = useState(false)

  return (
    <>
      <header className="glass-header fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowHistory(true)}
              className="p-1.5 -ml-2 text-on-surface hover:bg-white/40 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-[22px] text-on-surface">menu</span>
            </button>
            <div className="flex flex-col">
              <h1 className="font-bold text-[17px] leading-tight text-on-surface tracking-tight">
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
            {/* <button className="p-2 rounded-full hover:bg-white/40 text-[#424754] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#424754]">volume_up</span>
            </button> */}
            <button
              onClick={onNewChat}
              className="p-2 rounded-full hover:bg-white/40 text-[#424754] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-[#424754]">add_comment</span>
            </button>
          </div>
        </div>
      </header>

      <Sheet open={showHistory} onOpenChange={setShowHistory}>
        <SheetContent side="left" showCloseButton={false} className="w-[85%] max-w-sm bg-[#faf9f5] p-0">
          <HistoryList
            onSelectSession={(session) => {
              onSelectHistory?.(session)
              setShowHistory(false)
            }}
            onClose={() => setShowHistory(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
