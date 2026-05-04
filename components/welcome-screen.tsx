"use client"

import Image from "next/image"
import { SUGGESTED_QUESTIONS } from "@/lib/chat-types"
import { useMemo, useState } from "react"
import { GuideDialog } from "@/components/guide-dialog"
import { ReportForm } from "@/components/report-form"

type Props = {
  onPickQuestion: (q: string) => void
}

const QUESTION_ICONS: Record<string, string> = {
  电梯: "water_drop",
  广告: "receipt_long",
  业委会: "support_agent",
  物业: "home",
  维修: "build",
}

export function WelcomeScreen({ onPickQuestion }: Props) {
  const [seed, setSeed] = useState(0)
  const [showReportForm, setShowReportForm] = useState(false)

  const questions = useMemo(() => {
    const list = [...SUGGESTED_QUESTIONS]
    const offset = seed % list.length
    return [...list.slice(offset), ...list.slice(0, offset)].slice(0, 3)
  }, [seed])

  function getIcon(text: string) {
    for (const [key, icon] of Object.entries(QUESTION_ICONS)) {
      if (text.includes(key)) return icon
    }
    return "chat_bubble"
  }

  return (
    <div className="flex flex-col relative">
      {/* User Guide Button */}
      <GuideDialog />

      {/* Character Display Area */}
      <div className="flex flex-col items-center mb-4 text-center relative px-4">
        <div className="absolute inset-0 persona-glow -z-10 scale-150 blur-3xl opacity-50"></div>
        <div className="relative mb-4 group">
          <div className="w-32 h-32 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center relative overflow-hidden shadow-premium border border-white/60">
            <Image
              src="/mascot.png"
              alt="安小居"
              width={160}
              height={160}
              priority
              className="size-full object-contain rounded-full drop-shadow-2xl"
            />
          </div>
        </div>
        <h2 className="text-xl font-extrabold text-on-surface mb-1 tracking-tight">
          上午好，很高兴为您服务
        </h2>
        <p className="text-[14px] leading-relaxed text-[#424754]/70 max-w-[90%] font-medium">
          我是您的物业管家安小居，有什么可以帮您？
        </p>
      </div>

      {/* Suggested Questions */}
      <section className="space-y-2 px-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[12px] font-bold text-on-surface/80 flex items-center gap-2 uppercase tracking-widest">
            <span className="material-symbols-outlined text-[16px] text-primary">auto_awesome</span>
            猜你想问
          </h3>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="text-[10px] font-bold text-primary flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="material-symbols-outlined text-[12px] text-primary">refresh</span> 换一批
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {questions.map((q) => (
            <button
              key={q}
              onClick={() => onPickQuestion(q)}
              className="glass-card group flex items-center gap-3 p-4 hover:bg-white/80 transition-all text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-[#3d8bff]/5 flex items-center justify-center group-hover:bg-[#3d8bff]/10 transition-colors">
                <span className="material-symbols-outlined text-primary/60 text-[18px]">
                  {getIcon(q)}
                </span>
              </div>
              <span className="flex-1 text-[14px] text-on-surface font-semibold">{q}</span>
              <span className="material-symbols-outlined text-[#727785]/40 text-[18px] group-hover:translate-x-1 group-hover:text-[#3d8bff] transition-all">
                arrow_forward
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Report Guidance Card */}
      {/* <div className="mx-4 mt-4 glass-card p-4 flex flex-col gap-3 border-[#3d8bff]/10 shadow-premium">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3d8bff]/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">construction</span>
          </div>
          <div>
            <h3 className="text-on-surface font-bold text-[15px] leading-tight">需要发起诉求吗？</h3>
            <p className="text-[#424754]/70 text-[12px] mt-1 leading-relaxed">
              遇到物业问题？点击按钮快速上报
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowReportForm(true)}
          className="w-full py-3 bg-[#3d8bff] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#3d8bff]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          立即上报诉求
        </button>
      </div> */}

      {/* Disclaimer */}
      {/* <div className="mx-4 mt-4 rounded-xl bg-[#efeeea]/50 px-3 py-2 text-center text-[11px] text-[#424754]/60 backdrop-blur-sm">
        本服务内容由人工智能生成，仅供参考
      </div> */}

      {/* Report Form Modal */}
      {showReportForm && (
        <ReportForm
          category="1"
          description=""
          onSubmit={(url) => {
            console.log("Report submitted:", url)
            setShowReportForm(false)
          }}
          onCancel={() => setShowReportForm(false)}
        />
      )}
    </div>
  )
}
