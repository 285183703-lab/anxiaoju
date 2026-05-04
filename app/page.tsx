"use client"

import { useState } from "react"
import { ChatHeader } from "@/components/chat-header"
import { WelcomeScreen } from "@/components/welcome-screen"
import { MessageList } from "@/components/message-list"
import { ChatInput } from "@/components/chat-input"
import { ReportForm } from "@/components/report-form"
import type { AssistantPayload, ChatMessage } from "@/lib/chat-types"

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [pending, setPending] = useState(false)
  const [reportReady, setReportReady] = useState<{
    category: string
    description: string
    reporterName?: string
    reporterPhone?: string
  } | null>(null)

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
        reportReady: data.report_ready
          ? {
              category: data.category,
              description: data.collected.description ?? "",
              reporterName: data.collected.reporter_name,
              reporterPhone: data.collected.reporter_phone,
            }
          : undefined,
      }
      setMessages((m) => [...m, aiMsg])

      if (data.report_ready && data.collected.description) {
        setReportReady({
          category: data.category,
          description: data.collected.description,
          reporterName: data.collected.reporter_name,
          reporterPhone: data.collected.reporter_phone,
        })
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "网络异常，请稍后再试。\n\n以上信息由 AI 生成，仅供参考。",
          intent: "irrelevant",
        },
      ])
    } finally {
      setPending(false)
    }
  }

  function handleReportSubmit(url: string) {
    window.location.href = url
  }

  function handleReportCancel() {
    setReportReady(null)
  }

  function reset() {
    if (pending) return
    setMessages([])
    setReportReady(null)
  }

  function handleReportClick(msg: ChatMessage) {
    if (msg.reportReady) {
      setReportReady({
        category: msg.reportReady.category,
        description: msg.reportReady.description,
        reporterName: msg.reportReady.reporterName,
        reporterPhone: msg.reportReady.reporterPhone,
      })
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl min-h-dvh flex flex-col">
      <ChatHeader onReset={reset} />

      {/* <div className={`flex-1  scrollbar-hidden ${hasChat ? "pt-4" : "pt-16"}`}> */}
       <div className="flex-1  scrollbar-hidden  pt-24">
        {hasChat ? (
          <MessageList messages={messages} pending={pending} onReportClick={handleReportClick} />
        ) : (
          <WelcomeScreen onPickQuestion={send} />
        )}
      </div>

      <div className={`pb-48 ${hasChat ? "" : "hidden"}`} />

      {reportReady && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[100] pb-[max(env(safe-area-inset-bottom),12px)]">
          <ReportForm
            category={reportReady.category}
            description={reportReady.description}
            reporterName={reportReady.reporterName}
            reporterPhone={reportReady.reporterPhone}
            onSubmit={handleReportSubmit}
            onCancel={handleReportCancel}
          />
        </div>
      )}

      <ChatInput onSend={send} disabled={pending || !!reportReady} />
    </main>
  )
}
