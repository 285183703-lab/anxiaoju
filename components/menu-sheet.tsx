"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { Menu, History, Bell, Settings, FileText, MessageCircleQuestion } from "lucide-react"

const items = [
  { icon: History, label: "历史会话", desc: "查看我的诉求记录" },
  { icon: Bell, label: "进度通知", desc: "投诉处理进度推送" },
  { icon: FileText, label: "我的工单", desc: "已转人工的诉求工单" },
  { icon: MessageCircleQuestion, label: "常见问题", desc: "物业政策 FAQ" },
  { icon: Settings, label: "设置", desc: "账号与偏好" },
]

export function MenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="菜单"
          className="flex size-10 items-center justify-center rounded-full text-foreground/80 transition hover:bg-white/40 active:scale-95"
        >
          <Menu className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[78%] max-w-sm bg-white p-0">
        <SheetHeader className="bg-gradient-to-b from-[var(--grad-from)] to-white px-5 pb-6 pt-8">
          <SheetTitle className="text-xl text-foreground">安小居</SheetTitle>
          <SheetDescription className="text-foreground/60">
            越城区物业 AI 助手
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col py-2">
          {items.map((it) => (
            <button
              key={it.label}
              className="flex items-center gap-4 px-5 py-4 text-left transition hover:bg-secondary/60 active:bg-secondary"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <it.icon className="size-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-medium text-foreground">{it.label}</span>
                <span className="text-xs text-foreground/55">{it.desc}</span>
              </span>
            </button>
          ))}
        </nav>
        <div className="px-5 pt-4 text-xs leading-relaxed text-foreground/50">
          本服务由绍兴市越城区「码上安居」平台提供，所有 AI 回复仅供参考，最终以人工受理结果为准。
        </div>
      </SheetContent>
    </Sheet>
  )
}
