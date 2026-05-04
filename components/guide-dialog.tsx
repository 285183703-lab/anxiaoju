"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

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
          className="absolute right-4 top-4 flex size-14 items-center justify-center rounded-full bg-[#3d8bff] text-white shadow-lg shadow-[#3d8bff]/30 transition-all hover:brightness-110 active:scale-95"
        >
          <span className="text-[11px] font-bold leading-tight tracking-tight">
            使用
            <br />
            指引
          </span>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="max-w-sm gap-0 overflow-hidden rounded-md border-none p-0">
        <DialogHeader className="space-y-2 bg-gradient-to-br from-[#d8e2ff]/40 via-[#faf9f5] to-[#b6ccff]/30 px-6 pb-5 pt-7 text-left">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-[20px] font-bold text-on-surface tracking-tight">使用指引</DialogTitle>
              <p className="text-[13px] text-[#424754]/70 font-medium mt-1">
                四步用好安小居，物业的事都能办
              </p>
            </div>
            <DialogClose className="flex size-9 items-center justify-center rounded-full bg-white/70 text-[#424754] transition-all hover:bg-white">
              <span className="material-symbols-outlined text-[18px] text-[#424754]">close</span>
            </DialogClose>
          </div>
        </DialogHeader>
        <ul className="flex flex-col gap-3 px-6 py-5">
          {guides.map((g) => (
            <li key={g.step} className="flex gap-3 rounded-xl bg-[#efeeea]/50 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#3d8bff] text-[13px] font-black text-white shadow-sm">
                {g.step}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-on-surface">{g.title}</span>
                <span className="text-[13px] leading-relaxed text-[#424754]/70 font-medium">{g.desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-6">
          <DialogClose asChild>
            <button className="w-full rounded-2xl bg-[#3d8bff] py-3.5 text-[14px] font-bold text-white shadow-lg shadow-[#3d8bff]/20 transition-all hover:brightness-110 active:scale-[0.98]">
              我知道了
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
