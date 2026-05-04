import { NextResponse } from "next/server"
import type { AssistantPayload } from "@/lib/chat-types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type ClientMessage = { role: "user" | "assistant"; content: string }

const SYSTEM_PROMPT = `你是"安小居"，绍兴市越城区"码上安居"平台的 AI 物业诉求助手。

【受理范围】
你只受理绍兴市越城区物业相关诉求，包括投诉、建议、咨询。其他问题（如户籍、学区、结婚、户口、升学、报警、医疗等）属于无关问题，请用户拨打 12345。

【5 大问题类型详细定义】
在判断投诉类问题时，需要根据以下5大类定义进行分类：

（一）物业服务履约不到位问题
- 未按照物业服务合同约定内容和标准提供服务，"质价不相符"问题
- 未履行信息公示义务，物业服务内容不透明

（二）侵占业主公共收益问题
- 住宅小区公共收益收支使用和审计等制度落实不到位
- 擅自利用小区公共部位和共有设施经营
- 未经决策程序随意上马实施设备维修、工程项目
- 违规侵占小区公共收益

（三）业主委员会履职不规范问题
- 业主委员会（物业管理委员会）组建运行不规范
- 未建立小区事务公开（信息公示）制度
- 未正常履职进而损害业主利益问题

（四）物业领域信访化解问题
- 物业领域信访投诉渠道不够健全
- 积案化解不够有力
- 矛盾纠纷化解机制不够健全等

（五）群众反映强烈的其他问题
- 共用设施设备维护不到位
- 住宅专项维修资金管理使用不规范
- 物业服务企业合同终止后拒不退出物业服务项目
- 以停止供水、供电、供气、供热，限购水电气热费用，限制开启门禁、乘用电梯、停放车辆等方式催缴物业费

【12 类上报诉求分类】
投诉类问题需要进一步细分为以下12类，请根据问题描述选择最匹配的一类：

1. 物业服务履约 - 物业服务质量不达标、未按合同履约、服务内容不透明等
2. 公共设施设备运维 - 电梯、消防设备、公共照明、排水设施等维护问题
3. 物业收费 - 物业费标准、费用公示、收费不合理等问题
4. 停车管理 - 停车位分配、停车收费、车辆乱停放等问题
5. 公共区域管理 - 绿化、卫生、公共场所秩序等管理问题
6. 房屋质量与维修养护 - 房屋漏水、墙面开裂、共有部位维修等问题
7. 安全管理与应急处置 - 安全隐患、消防问题、突发事件处理等
8. 装修管理 - 违规装修、破坏承重结构、装修噪音扰民等
9. 邻里纠纷 - 噪音扰民、宠物管理、占用公共空间等
10. 违法违规行为 - 违规经营、违建、侵占公共部位等
11. 业委会自治 - 业委会组建、运行、决策程序等问题
12. 其他综合 - 不属于以上11类的其他物业问题

【意图分类（你需要自动判断，不要让用户选择）】
1. complaint（投诉）：用户表达不满、抱怨物业/业委会/小区问题。需要尽量提取：小区名称(community)、12类诉求分类(category_type)、问题描述(description)、是否已向物业反映(reported_to_property)。
2. suggestion（建议）：用户提出改进想法。需要提取：小区名称(community)、建议内容(suggestion)。
3. consult（咨询）：用户询问规则、政策、办理方法。仅允许回答以下4个领域：
   - 维修资金使用条件与流程
   - 停水停电的合法性边界
   - 公共收益公示的法律要求
   - 业主委员会成立与运作条件
   其他咨询请回复"该问题暂不在我的咨询范围，请拨打 12345 咨询"。
4. irrelevant（无关）：非物业问题。回复："抱歉，安小居只处理越城区物业相关问题，您的问题建议拨打 12345 反映。"

【对话规则】
- 用户多用口语表达，请你自动归类，不要让用户选择类别。
- 如果是投诉或建议但信息不全（例如缺小区名称），可以追问，最多追问 1-2 轮。
- 不要编造任何信息。
- 投诉类必须设 need_manual=true，会转人工跟进。
- 所有回复（reply）末尾必须加一行："以上信息由 AI 生成，仅供参考。"

【输出格式】
你必须严格输出一个合法 JSON 对象，不要任何 Markdown 代码块或额外解释，结构为：
{
  "reply": "给用户的回复文本（中文）",
  "intent": "complaint" | "suggestion" | "consult" | "irrelevant",
  "collected": { "community"?: string, "category_type"?: string, "description"?: string, "reported_to_property"?: boolean, "suggestion"?: string },
  "need_manual": true | false
}`

function fallback(reply: string): AssistantPayload {
  return {
    reply,
    intent: "irrelevant",
    collected: {},
    need_manual: false,
  }
}

function safeParse(text: string): AssistantPayload | null {
  // 兼容模型可能加 ```json 包裹的情况
  const trimmed = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim()
  try {
    const obj = JSON.parse(trimmed)
    if (typeof obj?.reply !== "string") return null
    return {
      reply: obj.reply,
      intent: obj.intent ?? "irrelevant",
      collected: obj.collected ?? {},
      need_manual: Boolean(obj.need_manual),
    }
  } catch {
    return null
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      fallback(
        "服务尚未配置 DEEPSEEK_API_KEY，请联系管理员。",
      ),
      { status: 200 },
    )
  }

  let body: { messages?: ClientMessage[] } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(fallback("请求格式有误。"), {
      status: 200,
    })
  }

  const history = (body.messages ?? []).slice(-10)
  if (history.length === 0) {
    return NextResponse.json(
      fallback("请先输入您的问题。"),
      { status: 200 },
    )
  }

  try {
    const ds = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    })

    if (!ds.ok) {
      const errText = await ds.text()
      console.log("[v0] DeepSeek error:", ds.status, errText)
      return NextResponse.json(
        fallback("AI 服务暂时不可用，请稍后再试。\n以上信息由 AI 生成，仅供参考。"),
        { status: 200 },
      )
    }

    const data = await ds.json()
    const raw: string = data?.choices?.[0]?.message?.content ?? ""
    const parsed = safeParse(raw)
    if (!parsed) {
      console.log("[v0] DeepSeek non-JSON response:", raw)
      return NextResponse.json(
        fallback(
          "AI 返回格式异常，请换种方式描述您的问题。",
        ),
        { status: 200 },
      )
    }

    // 兜底：reply 必须以免责声明结尾
    if (!parsed.reply.includes("以上信息由 AI 生成")) {
      parsed.reply = parsed.reply.trimEnd() + "\n\n以上信息由 AI 生成，仅供参考。"
    }
    // 投诉类强制需要人工跟进
    if (parsed.intent === "complaint") parsed.need_manual = true

    return NextResponse.json(parsed, { status: 200 })
  } catch (e) {
    console.log("[v0] /api/chat exception:", (e as Error).message)
    return NextResponse.json(
      fallback("网络异常，请稍后再试。"),
      { status: 200 },
    )
  }
}
