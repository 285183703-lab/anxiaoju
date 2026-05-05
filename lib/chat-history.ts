import type { ChatMessage } from "./chat-types"

export type ChatSession = {
  id: string
  title: string
  preview: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = "chat_history"
const MAX_SESSIONS = 10

export function getSessions(): ChatSession[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveSession(messages: ChatMessage[]): ChatSession {
  const sessions = getSessions()

  const title = messages.find((m) => m.role === "user")?.content.slice(0, 30) ?? "新对话"
  const preview = messages.find((m) => m.role === "user")?.content.slice(0, 50) ?? ""

  const newSession: ChatSession = {
    id: crypto.randomUUID(),
    title,
    preview,
    messages,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const updated = [newSession, ...sessions].slice(0, MAX_SESSIONS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return newSession
}

export function updateSession(id: string, messages: ChatMessage[]): void {
  const sessions = getSessions()
  const index = sessions.findIndex((s) => s.id === id)
  if (index === -1) return

  const title = messages.find((m) => m.role === "user")?.content.slice(0, 30) ?? sessions[index].title
  const preview = messages.find((m) => m.role === "user")?.content.slice(0, 50) ?? ""

  sessions[index] = {
    ...sessions[index],
    title,
    preview,
    messages,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

export function deleteSession(id: string): void {
  const sessions = getSessions()
  const filtered = sessions.filter((s) => s.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function clearAllSessions(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getSession(id: string): ChatSession | null {
  const sessions = getSessions()
  return sessions.find((s) => s.id === id) ?? null
}
