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
        <div className="flex gap-3">
          <div className="self-start shrink-0">
            <Avatar role="assistant" />
          </div>
          <div className="message-bubble-nova rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm self-start">
            <Loader2 className="size-4 animate-spin text-primary" />
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
            "whitespace-pre-wrap rounded-md px-5 py-4 text-[15px] leading-relaxed shadow-sm",
            isUser
              ? "message-bubble-user rounded-tr-none text-white"
              : "message-bubble-nova rounded-tl-none text-on-surface",
          ].join(" ")}
        >
          {message.content}
        </div>
        {canReport && (
          <div className="mt-3 glass-card p-4 flex flex-col gap-3 border-[#3d8bff]/10 shadow-premium">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3d8bff]/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]">construction</span>
              </div>
              <div>
                <h3 className="text-[#1b1c1a] font-bold text-[15px] leading-tight">需要发起诉求吗？</h3>
                <p className="text-[#424754]/70 text-[12px] mt-1 leading-relaxed">
                  遇到物业问题？点击按钮快速上报
                </p>
              </div>
            </div>
            <button
              onClick={() => onReportClick?.(message)}
              className="w-full py-3 bg-[#3d8bff] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#3d8bff]/20 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              立即上报诉求
            </button>
          </div>
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
