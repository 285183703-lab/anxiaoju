"use client"

import { useState } from "react"
import { ChatHeader } from "@/components/chat-header"
import { WelcomeScreen } from "@/components/welcome-screen"
import { MessageList } from "@/components/message-list"
import { ChatInput } from "@/components/chat-input"
import type { AssistantPayload, ChatMessage } from "@/lib/chat-types"

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [pending, setPending] = useState(false)

  const hasChat = messages.length > 0

  async function send(text: string) {
    if (!text.trim() || pending) return

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    }

    const next = [...messages, userMsg]
    setMessages(next)
    setPending(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const data: AssistantPayload = await res.json()

      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        intent: data.intent,
        needManual: data.need_manual,
      }
      setMessages((m) => [...m, aiMsg])
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "网络异常，请稍后再试。\n\n以上信息由 AI 生成，仅供参考。",
          intent: "irrelevant",
        },
      ])
    } finally {
      setPending(false)
    }
  }

  function reset() {
    if (pending) return
    setMessages([])
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col">
      <ChatHeader onReset={reset} />

      <div className="flex-1 overflow-y-auto pt-2 scrollbar-hidden">
        {hasChat ? (
          <MessageList messages={messages} pending={pending} />
        ) : (
          <WelcomeScreen onPickQuestion={send} />
        )}
      </div>

      <ChatInput onSend={send} disabled={pending} />
    </main>
  )
}
