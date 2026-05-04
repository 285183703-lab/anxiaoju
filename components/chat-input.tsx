"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"
import { ArrowUp, AudioLines } from "lucide-react"

type Props = {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("")

  function submit(e?: FormEvent) {
    e?.preventDefault()
    const v = value.trim()
    if (!v || disabled) return
    onSend(v)
    setValue("")
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form
      onSubmit={submit}
      className="sticky bottom-0 z-30 w-full bg-gradient-to-t from-[var(--grad-to)] via-[var(--grad-to)]/90 to-transparent px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-3"
    >
      <div className="flex items-end gap-2">
        <button
          type="button"
          aria-label="语音输入"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/70 text-foreground/70 shadow-sm backdrop-blur transition active:scale-95"
        >
          <AudioLines className="size-5" />
        </button>

        <div className="flex-1 rounded-3xl bg-white/85 px-4 py-2 shadow-sm backdrop-blur">
          <textarea
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="请输入您的物业问题…"
            className="block max-h-32 w-full resize-none bg-transparent py-1.5 text-[15px] leading-6 text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          aria-label="发送"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30 transition active:scale-95 disabled:bg-primary/40 disabled:shadow-none"
        >
          <ArrowUp className="size-5" />
        </button>
      </div>
    </form>
  )
}
