export type Intent = "complaint" | "suggestion" | "consult" | "irrelevant"

export type Category =
  | "1" // 物业服务履约
  | "2" // 公共设施设备运维
  | "3" // 物业收费
  | "4" // 停车管理
  | "5" // 公共区域管理
  | "6" // 房屋质量与维修养护
  | "7" // 安全管理与应急处置
  | "8" // 装修管理
  | "9" // 邻里纠纷
  | "10" // 违法违规行为
  | "11" // 业委会自治
  | "12" // 其他综合

export type Collected = {
  community?: string
  category_type?: string
  description?: string
  reported_to_property?: boolean | null
  suggestion?: string
  report_ready?: boolean
  reporter_name?: string
  reporter_phone?: string
}

export type AssistantPayload = {
  reply: string
  intent: Intent
  category: Category
  collected: Collected
  need_manual: boolean
  report_ready?: boolean
}

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  intent?: Intent
  category?: Category
  needManual?: boolean
  reportReady?: ReportReady
}

export const SUGGESTED_QUESTIONS: string[] = [
  "我们小区电梯坏了一周还没修，物业不管怎么办？",
  "物业的广告收益从来不公示，这合法吗？",
  "业委会一直不成立，我应该向谁反映？",
  "物业服务太差，业主能集体换物业吗？",
  "维修资金能用来修小区门禁吗？",
]

export type ReportReady = {
  category: string
  description: string
  reporterName?: string
  reporterPhone?: string
}
