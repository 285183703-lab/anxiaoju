"use client"

import { useState, useEffect } from "react"
import { getSessions, deleteSession, type ChatSession } from "@/lib/chat-history"
import { History, Trash2, ChevronRight } from "lucide-react"
import { SheetTitle } from "@/components/ui/sheet"

type Props = {
  onSelectSession: (session: ChatSession) => void
  onClose: () => void
}

export function HistoryList({ onSelectSession, onClose }: Props) {
  const [sessions, setSessions] = useState<ChatSession[]>([])

  useEffect(() => {
    setSessions(getSessions())
  }, [])

  function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    deleteSession(id)
    setSessions(getSessions())
  }

  function formatTime(isoString: string) {
    const date = new Date(isoString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "今天"
    if (diffDays === 1) return "昨天"
    if (diffDays < 7) return `${diffDays}天前`
    return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#e3e2df]">
        <div className="flex items-center gap-2">
          <History className="size-5 text-[#424754]" />
          <SheetTitle asChild>
            <h2 className="text-[17px] font-bold text-[#1b1c1a]">历史会话</h2>
          </SheetTitle>
        </div>
        <button
          onClick={onClose}
          className="p-2 -mr-2 rounded-full hover:bg-[#f4f4f0] text-[#424754] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-[#424754]/60">
            <History className="size-12 mb-3 opacity-40" />
            <p className="text-[14px]">暂无历史会话</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#e3e2df]/50">
            {sessions.map((session) => (
              <li key={session.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    onSelectSession(session)
                    onClose()
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      onSelectSession(session)
                      onClose()
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#f4f4f0]/50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[15px] font-semibold text-[#1b1c1a] truncate">
                        {session.title}
                      </span>
                      <span className="text-[11px] text-[#424754]/60 shrink-0">
                        {formatTime(session.updatedAt)}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#424754]/70 mt-0.5 truncate">
                      {session.preview}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => handleDelete(e, session.id)}
                      className="p-2 rounded-full hover:bg-[#ffdad6] text-[#424754]/50 hover:text-[#ba1a1a] transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                    <ChevronRight className="size-5 text-[#424754]/30" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
