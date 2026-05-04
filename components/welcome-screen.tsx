"use client"

import Image from "next/image"
import { ChevronRight, RefreshCw } from "lucide-react"
import { SUGGESTED_QUESTIONS } from "@/lib/chat-types"
import { useMemo, useState } from "react"
import { GuideDialog } from "@/components/guide-dialog"

type Props = {
  onPickQuestion: (q: string) => void
}

export function WelcomeScreen({ onPickQuestion }: Props) {
  const [seed, setSeed] = useState(0)

  const questions = useMemo(() => {
    // 简易"换一批"：基于 seed 旋转列表
    const list = [...SUGGESTED_QUESTIONS]
    const offset = seed % list.length
    return [...list.slice(offset), ...list.slice(0, offset)].slice(0, 5)
  }, [seed])

  return (
    <div className="flex flex-col gap-6 px-4 pb-6">
      {/* 免责说明 */}
      <div className="rounded-2xl bg-white/45 px-4 py-3 text-center text-sm text-foreground/70 backdrop-blur-sm">
        本服务内容由人工智能生成，所提供的信息仅供参考。
      </div>

      {/* 欢迎语 */}
      <p className="px-2 text-center text-[17px] leading-relaxed text-foreground text-balance">
        Hi！我是 AI 物业助手
        <span className="font-semibold text-primary">安小居</span>
        ，问政策、提投诉、给建议，越城区物业的事您都可以跟我说~
      </p>

      {/* 吉祥物 */}
      <div className="relative flex items-center justify-center pt-2">
        <div className="animate-float">
          <Image
            src="/mascot.png"
            alt="安小居 吉祥物"
            width={220}
            height={220}
            priority
            className="size-44 object-contain drop-shadow-[0_18px_20px_rgba(91,141,239,0.25)] mix-blend-multiply"
          />
        </div>

        {/* 用户指引悬浮按钮（带弹窗） */}
        <GuideDialog />
      </div>

      {/* 推荐问题卡片 */}
      <section className="rounded-3xl bg-white/55 p-4 backdrop-blur-md">
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-[15px] font-medium text-foreground/70">你可能想了解</h2>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary transition active:scale-95"
            aria-label="换一批"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>

        <ul className="rounded-2xl bg-card">
          {questions.map((q, i) => (
            <li key={q}>
              <button
                onClick={() => onPickQuestion(q)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left text-[15px] text-foreground transition hover:bg-secondary/60 active:bg-secondary"
              >
                <span className="flex-1 text-pretty leading-snug">{q}</span>
                <ChevronRight className="size-5 shrink-0 text-primary/80" />
              </button>
              {i < questions.length - 1 && <div className="mx-4 h-px bg-border/70" />}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
