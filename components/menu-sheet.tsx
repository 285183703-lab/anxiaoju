"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { History, Bell, FileText } from "lucide-react"

const items = [
  { icon: History, label: "历史会话", desc: "查看我的诉求记录" },
  { icon: Bell, label: "进度通知", desc: "投诉处理进度推送" },
  { icon: FileText, label: "我的工单", desc: "已转人工的诉求工单" },
  { icon: History, label: "常见问题", desc: "物业政策 FAQ" },
]

export function MenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="菜单"
          className="p-1.5 -ml-2 text-[#1b1c1a] hover:bg-white/40 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[22px] text-[#1b1c1a]">menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] max-w-sm bg-[#faf9f5] p-0">
        <SheetHeader className="bg-gradient-to-b from-[#d8e2ff]/30 to-[#faf9f5] px-6 pb-6 pt-8">
          <SheetTitle className="text-xl font-bold text-[#1b1c1a] tracking-tight">安小居</SheetTitle>
          <p className="text-[13px] text-[#424754]/70 font-medium">
            越城区物业 AI 助手
          </p>
        </SheetHeader>
        <nav className="flex flex-col py-3">
          {items.map((it) => (
            <button
              key={it.label}
              className="flex items-center gap-4 px-6 py-4 text-left transition-all hover:bg-[#efeeea]/50 active:scale-[0.99]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#3d8bff]/10 text-[#3d8bff]">
                <it.icon className="size-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#1b1c1a]">{it.label}</span>
                <span className="text-[12px] text-[#424754]/60">{it.desc}</span>
              </span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-[#efeeea]/30">
          <p className="text-[11px] leading-relaxed text-[#424754]/50 font-medium">
            本服务由绍兴市越城区「码上安居」平台提供，所有 AI 回复仅供参考，最终以人工受理结果为准。
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
