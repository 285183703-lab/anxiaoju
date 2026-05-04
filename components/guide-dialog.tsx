"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

const guides = [
  {
    step: "01",
    title: "问政策",
    desc: "「物业费什么时候交？」「业委会怎么成立？」直接问就行。",
  },
  {
    step: "02",
    title: "提投诉",
    desc: "电梯故障、外墙漏水、噪音扰民等问题，描述具体地址和现象，会自动转人工受理。",
  },
  {
    step: "03",
    title: "给建议",
    desc: "对小区管理、物业服务有想法？说出来，我会记录给越城区物业办。",
  },
  {
    step: "04",
    title: "查进度",
    desc: "已提交的投诉/建议，可以在「菜单 - 我的工单」中查看处理进度。",
  },
]

export function GuideDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="用户指引"
          className="absolute right-2 top-4 flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 active:scale-95"
        >
          <span className="text-xs font-medium leading-tight tracking-wide">
            用户
            <br />
            指引
          </span>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="max-w-sm gap-0 overflow-hidden rounded-3xl border-none bg-white p-0">
        <DialogHeader className="space-y-2 bg-gradient-to-br from-[var(--grad-from)] via-white to-[var(--grad-to)] px-6 pb-5 pt-7 text-left">
          <DialogTitle className="text-xl text-foreground">使用指引</DialogTitle>
          <DialogDescription className="text-foreground/60">
            四步用好安小居，物业的事都能办
          </DialogDescription>
          <DialogClose
            aria-label="关闭"
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-white/70 text-foreground/60 transition hover:bg-white"
          >
            <X className="size-4" />
          </DialogClose>
        </DialogHeader>
        <ul className="flex flex-col gap-3 px-6 py-5">
          {guides.map((g) => (
            <li key={g.step} className="flex gap-3 rounded-2xl bg-secondary/50 p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {g.step}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-medium text-foreground">{g.title}</span>
                <span className="text-[13px] leading-relaxed text-foreground/65">{g.desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <DialogClose asChild>
          <button className="mx-6 mb-6 mt-2 rounded-full bg-primary py-3 text-[15px] font-medium text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]">
            我知道了
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
