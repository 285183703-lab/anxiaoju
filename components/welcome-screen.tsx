"use client"

import Image from "next/image"
import { SUGGESTED_QUESTIONS } from "@/lib/chat-types"
import { useMemo, useState } from "react"
import { GuideDialog } from "@/components/guide-dialog"

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
      <div className="flex flex-col items-center mb-8 text-center relative px-6">
        <div className="absolute inset-0 persona-glow -z-10 scale-150 blur-3xl opacity-50"></div>
        <div className="relative mb-6 group">
          <div className="w-40 h-40 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center relative overflow-hidden shadow-premium border border-white/60">
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
        <h2 className="text-2xl font-extrabold text-[#1b1c1a] mb-2 tracking-tight">
          上午好，很高兴为您服务
        </h2>
        <p className="text-[15px] leading-relaxed text-[#424754]/70 max-w-[85%] font-medium">
          我是您的物业管家安小居，无论是报修、查询账单还是建议投诉，我都在这里为您排忧解难。
        </p>
      </div>

      {/* Suggested Questions */}
      <section className="space-y-3 px-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[13px] font-bold text-[#1b1c1a]/80 flex items-center gap-2 uppercase tracking-widest">
            <span className="material-symbols-outlined text-[18px] text-[#3d8bff]">auto_awesome</span>
            猜你想问
          </h3>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="text-[11px] font-bold text-[#3d8bff] flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="material-symbols-outlined text-[14px] text-[#3d8bff]">refresh</span> 换一批
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {questions.map((q) => (
            <button
              key={q}
              onClick={() => onPickQuestion(q)}
              className="glass-card group flex items-center gap-4 p-5 hover:bg-white/80 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-[#3d8bff]/5 flex items-center justify-center group-hover:bg-[#3d8bff]/10 transition-colors">
                <span className="material-symbols-outlined text-[#3d8bff]/60 text-[20px]">
                  {getIcon(q)}
                </span>
              </div>
              <span className="flex-1 text-[15px] text-[#1b1c1a] font-semibold">{q}</span>
              <span className="material-symbols-outlined text-[#727785]/40 text-[20px] group-hover:translate-x-1 group-hover:text-[#3d8bff] transition-all">
                arrow_forward
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Report Guidance Card */}
      <div className="mx-6 mt-6 glass-card p-6 flex flex-col gap-5 border-[#3d8bff]/10 shadow-premium">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#3d8bff]/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#3d8bff] text-[24px]">construction</span>
          </div>
          <div>
            <h3 className="text-[#1b1c1a] font-bold text-[17px] leading-tight">需要发起诉求吗？</h3>
            <p className="text-[#424754]/70 text-[13px] mt-1.5 leading-relaxed">
              如果您家中遇到水电设备故障或其他物业问题，安小居可以立即为您安排专业技师上门。
            </p>
          </div>
        </div>
        <button className="w-full py-3.5 bg-[#3d8bff] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#3d8bff]/20 hover:brightness-110 active:scale-[0.98] transition-all inner-glow">
          立即上报诉求
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mx-6 mt-6 rounded-xl bg-[#efeeea]/50 px-4 py-3 text-center text-[12px] text-[#424754]/60 backdrop-blur-sm">
        本服务内容由人工智能生成，仅供参考
      </div>
    </div>
  )
}
