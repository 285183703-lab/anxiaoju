"use client"

import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
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
      {/* 左侧：菜单按钮 */}
      <button
        onClick={() => setShowHistory(true)}
        className="fixed glass-card left-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/40 backdrop-blur-2xl text-[#424754] shadow-xl shadow-[#424754]/15 border border-white/30 transition-all hover:bg-white/60 hover:scale-105 hover:shadow-2xl active:scale-95"
      >
        <span className="material-symbols-outlined text-[24px]">more_horiz</span>
      </button>

      {/* 中间：品牌标识 */}
      <div className=" glass-card fixed left-1/2 top-6 z-50 -translate-x-1/2 flex h-12 items-center gap-2 rounded-full bg-white/40 px-6 backdrop-blur-2xl shadow-xl shadow-[#424754]/15 border border-white/30">
        <span className="text-[17px] font-bold text-[#1b1c1a] tracking-tight">安小居</span>
      </div>

      {/* 右侧：新建对话按钮 */}
      <button
        onClick={onNewChat}
        className="glass-card fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/40 backdrop-blur-2xl text-[#424754] shadow-xl shadow-[#424754]/15 border border-white/30 transition-all hover:bg-white/60 hover:scale-105 hover:shadow-2xl active:scale-95"
      >
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>

      {/* 历史会话弹窗 */}
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
