"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import type { ChatMessage } from "@/lib/chat-types"
import { Loader2, UserRound } from "lucide-react"

type Props = {
  messages: ChatMessage[]
  pending: boolean
}

const intentLabel: Record<string, { text: string; cls: string }> = {
  complaint: { text: "投诉 · 已转人工", cls: "bg-destructive/10 text-destructive" },
  suggestion: { text: "建议", cls: "bg-primary/10 text-primary" },
  consult: { text: "咨询", cls: "bg-accent text-accent-foreground" },
  irrelevant: { text: "非物业问题", cls: "bg-muted text-muted-foreground" },
}

export function MessageList({ messages, pending }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, pending])

  return (
    <div className="flex flex-col gap-4 px-4 pb-6">
      {/* 顶部小提示 */}
      <div className="mx-auto rounded-full bg-white/45 px-3 py-1 text-xs text-foreground/60 backdrop-blur-sm">
        本服务内容由人工智能生成，仅供参考
      </div>

      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}

      {pending && (
        <div className="flex items-end gap-2">
          <Avatar role="assistant" />
          <div className="animate-pop-in rounded-2xl rounded-tl-sm bg-card px-4 py-3 shadow-sm">
            <Loader2 className="size-4 animate-spin text-primary" />
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"
  const tag = !isUser && message.intent ? intentLabel[message.intent] : null

  return (
    <div
      className={`animate-pop-in flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <Avatar role={message.role} />
      <div className={`flex max-w-[78%] flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        {tag && (
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tag.cls}`}>
            {tag.text}
          </span>
        )}
        <div
          className={[
            "whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm",
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm bg-card text-card-foreground",
          ].join(" ")}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}

function Avatar({ role }: { role: "user" | "assistant" }) {
  if (role === "assistant") {
    return (
      <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-primary/20">
        <Image
          src="/mascot.png"
          alt="安小居"
          width={64}
          height={64}
          className="size-full object-cover"
        />
      </div>
    )
  }
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
      <UserRound className="size-5" />
    </div>
  )
}
