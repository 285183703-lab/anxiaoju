"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import type { ChatMessage } from "@/lib/chat-types"
import { Loader2 } from "lucide-react"

type Props = {
  messages: ChatMessage[]
  pending: boolean
  onReportClick?: (msg: ChatMessage) => void
}


export function MessageList({ messages, pending, onReportClick }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, pending])

  return (
    <div className="flex flex-col gap-6 px-6 pb-6">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} onReportClick={onReportClick} />
      ))}

      {pending && (
        <div className="flex items-end gap-3">
          <Avatar role="assistant" />
          <div className="message-bubble-nova rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <Loader2 className="size-4 animate-spin text-[#3d8bff]" />
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}

function MessageBubble({ message, onReportClick }: { message: ChatMessage; onReportClick?: (msg: ChatMessage) => void }) {
  const isUser = message.role === "user"
  const canReport = !isUser && message.intent === "complaint" && message.reportReady

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* 头像固定在顶部 */}
      <div className="self-start shrink-0">
        <Avatar role={message.role} />
      </div>
      {/* 消息内容 */}
      <div className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={[
            "whitespace-pre-wrap rounded-[1.5rem] px-5 py-4 text-[15px] leading-relaxed shadow-sm",
            isUser
              ? "message-bubble-user rounded-tr-none text-white"
              : "message-bubble-nova rounded-tl-none text-[#1b1c1a]",
          ].join(" ")}
        >
          {message.content}
        </div>
        {canReport && (
          <button
            onClick={() => onReportClick?.(message)}
            className="mt-2 flex items-center gap-2 rounded-full bg-[#3d8bff]/10 px-5 py-2.5 text-sm font-bold text-[#3d8bff] transition hover:bg-[#3d8bff]/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px] text-[#3d8bff]">edit_note</span>
            填写上报信息
          </button>
        )}
      </div>
    </div>
  )
}

function Avatar({ role }: { role: "user" | "assistant" }) {
  if (role === "assistant") {
    return (
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-white/60 shadow-md overflow-hidden">
        <Image
          src="/mascot.png"
          alt="安小居"
          width={32}
          height={32}
          className="size-full object-cover"
        />
      </div>
    )
  }
  return (
    <div className="w-8 h-8 rounded-full bg-[#d8e2ff] flex items-center justify-center border border-white shadow-md">
      <span className="material-symbols-outlined text-[#001a42] text-[16px]">person</span>
    </div>
  )
}
