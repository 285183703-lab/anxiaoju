"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"

type AddressItem = {
  key: string
  label: string
  id: string
}

type VillageItem = {
  projectId: string
  projectName: string
  cityCd: string
  commlityCd: string
  cityName: string
  commlityName: string
}

type FormData = {
  reporterName: string
  reporterPhone: string
  categoryCd: string
  remandContent: string
  street: AddressItem | null
  community: AddressItem | null
  village: VillageItem | null
}

type Props = {
  category: string
  description: string
  reporterName?: string
  reporterPhone?: string
  onSubmit: (url: string) => void
  onCancel: () => void
}

const CATEGORY_MAP: Record<string, { label: string; code: string }> = {
  "1": { label: "物业服务履约", code: "01" },
  "2": { label: "公共设施设备运维", code: "02" },
  "3": { label: "物业收费", code: "03" },
  "4": { label: "停车管理", code: "04" },
  "5": { label: "公共区域管理", code: "05" },
  "6": { label: "房屋质量与维修养护", code: "06" },
  "7": { label: "安全管理与应急处置", code: "07" },
  "8": { label: "装修管理", code: "08" },
  "9": { label: "邻里纠纷", code: "09" },
  "10": { label: "违法违规行为", code: "10" },
  "11": { label: "业委会自治", code: "11" },
  "12": { label: "其他综合", code: "12" },
}

const REPORT_URL = "https://www.hzrongzhi.com:9443/hfms/wyzb/index.html#/create-appeal"

export function ReportForm({ category, description, reporterName, reporterPhone, onSubmit, onCancel }: Props) {
  const [loading, setLoading] = useState(false)
  const [streets, setStreets] = useState<AddressItem[]>([])
  const [communities, setCommunities] = useState<AddressItem[]>([])
  const [villages, setVillages] = useState<VillageItem[]>([])

  const [form, setForm] = useState<FormData>({
    reporterName: reporterName ?? "",
    reporterPhone: reporterPhone ?? "",
    categoryCd: CATEGORY_MAP[category]?.code ?? "12",
    remandContent: description.slice(0, 500),
    street: null,
    community: null,
    village: null,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  useEffect(() => {
    fetch("/api/address?type=street")
      .then((r) => r.json())
      .then((d) => setStreets(d.list ?? []))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!form.street) {
      setCommunities([])
      setVillages([])
      setForm((f) => ({ ...f, community: null, village: null }))
      return
    }
    fetch(`/api/address?type=community&cityKey=${form.street.key}`)
      .then((r) => r.json())
      .then((d) => setCommunities(d.list ?? []))
      .catch(console.error)
  }, [form.street])

  useEffect(() => {
    if (!form.street || !form.community) {
      setVillages([])
      setForm((f) => ({ ...f, village: null }))
      return
    }
    fetch(`/api/address?type=village&cityCd=${form.street.key}&commlityCd=${form.community.key}`)
      .then((r) => r.json())
      .then((d) => setVillages(d.list ?? []))
      .catch(console.error)
  }, [form.street, form.community])

  function validate(): boolean {
    const errs: typeof errors = {}
    if (!form.reporterName.trim()) errs.reporterName = "请输入联系人姓名"
    if (!form.reporterPhone.trim()) errs.reporterPhone = "请输入手机号"
    else if (!/^1[3-9]\d{9}$/.test(form.reporterPhone))
      errs.reporterPhone = "手机号格式不正确"
    if (!form.street) errs.street = "请选择街道"
    if (!form.community) errs.community = "请选择社区"
    if (!form.village) errs.village = "请选择小区"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    if (!form.village) return

    const params = new URLSearchParams({
      projectId: form.village.projectId,
      cityCd: form.street!.key,
      commlityCd: form.community!.key,
      categoryCd: form.categoryCd,
      remandContent: form.remandContent,
      reporterName: form.reporterName,
      reporterPhone: form.reporterPhone,
    })

    const url = `${REPORT_URL}?${params.toString()}`
    onSubmit(url)
  }

  return (
    <div className="mx-4 rounded-md glass-card p-6 shadow-premium">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[17px] font-bold text-on-surface">确认上报信息</h3>
        <button onClick={onCancel} className="w-10 h-10 p-2 -mr-2 rounded-full hover:bg-white/40 text-[#424754] transition-colors">
          <span className="material-symbols-outlined text-[20px] text-[#424754]">close</span>
        </button>
      </div>

      {/* 问题类型 */}
      <div className="glass-card p-4 rounded-xl mb-4 border-[#3d8bff]/10">
        <div className="text-[11px] text-[#424754]/60 font-semibold uppercase tracking-wider mb-1">诉求类型</div>
        <div className="text-[15px] font-bold text-primary">
          {CATEGORY_MAP[category]?.label ?? "其他综合"}
        </div>
      </div>

      {/* 问题描述 */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-[12px] text-[#424754] font-semibold mb-2">
          <span className="material-symbols-outlined text-[16px] text-[#424754]">person</span>
          问题描述
        </label>
        <textarea
          value={form.remandContent}
          onChange={(e) => setForm({ ...form, remandContent: e.target.value })}
          placeholder="请输入问题描述"
          rows={4}
          className="w-full rounded-sm border border-white/60 bg-white/70 px-3 py-2 text-[14px] text-on-surface leading-relaxed placeholder:text-[#727785]/40 focus:border-[#3d8bff] focus:outline-none focus:ring-2 focus:ring-[#3d8bff]/20 transition-all resize-none"
        />
        {errors.remandContent && <p className="mt-1.5 text-[12px] text-[#ba1a1a] font-medium">{errors.remandContent}</p>}
      </div>


      {/* 联系人 */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-[12px] text-[#424754] font-semibold mb-2">
          <span className="material-symbols-outlined text-[16px] text-[#424754]">person</span>
          联系人姓名
        </label>
        <input
          type="text"
          value={form.reporterName}
          onChange={(e) => setForm({ ...form, reporterName: e.target.value })}
          placeholder="请输入姓名"
          className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[15px] text-on-surface placeholder:text-[#727785]/40 focus:border-[#3d8bff] focus:outline-none focus:ring-2 focus:ring-[#3d8bff]/20 transition-all"
        />
        {errors.reporterName && <p className="mt-1.5 text-[12px] text-[#ba1a1a] font-medium">{errors.reporterName}</p>}
      </div>

      {/* 手机号 */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-[12px] text-[#424754] font-semibold mb-2">
          <span className="material-symbols-outlined text-[16px] text-[#424754]">phone</span>
          手机号码
        </label>
        <input
          type="tel"
          value={form.reporterPhone}
          onChange={(e) => setForm({ ...form, reporterPhone: e.target.value })}
          placeholder="请输入手机号"
          maxLength={11}
          className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[15px] text-on-surface placeholder:text-[#727785]/40 focus:border-[#3d8bff] focus:outline-none focus:ring-2 focus:ring-[#3d8bff]/20 transition-all"
        />
        {errors.reporterPhone && <p className="mt-1.5 text-[12px] text-[#ba1a1a] font-medium">{errors.reporterPhone}</p>}
      </div>

      {/* 地址选择 */}
      {/* <div className="space-y-3 mb-5">
        <div>
          <label className="flex items-center gap-2 text-[12px] text-[#424754] font-semibold mb-2">
            <MapPin className="size-4 text-[#424754]" />
            街道
          </label>
          <select
            value={form.street?.key ?? ""}
            onChange={(e) => {
              const s = streets.find((x) => x.key === e.target.value) ?? null
              setForm({ ...form, street: s, community: null, village: null })
            }}
            className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[15px] text-on-surface focus:border-[#3d8bff] focus:outline-none focus:ring-2 focus:ring-[#3d8bff]/20 transition-all"
          >
            <option value="">请选择街道</option>
            {streets.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
          {errors.street && <p className="mt-1.5 text-[12px] text-[#ba1a1a] font-medium">{errors.street}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] text-[#424754] font-semibold mb-2">
            <MapPin className="size-4 text-[#424754]" />
            社区
          </label>
          <select
            value={form.community?.key ?? ""}
            onChange={(e) => {
              const c = communities.find((x) => x.key === e.target.value) ?? null
              setForm({ ...form, community: c, village: null })
            }}
            disabled={!form.street}
            className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[15px] text-on-surface focus:border-[#3d8bff] focus:outline-none focus:ring-2 focus:ring-[#3d8bff]/20 transition-all disabled:opacity-50"
          >
            <option value="">{form.street ? "请选择社区" : "请先选择街道"}</option>
            {communities.map((c) => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
          {errors.community && <p className="mt-1.5 text-[12px] text-[#ba1a1a] font-medium">{errors.community}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] text-[#424754] font-semibold mb-2">
            <MapPin className="size-4 text-[#424754]" />
            小区
          </label>
          <select
            value={form.village?.projectId ?? ""}
            onChange={(e) => {
              const v = villages.find((x) => x.projectId === e.target.value) ?? null
              setForm({ ...form, village: v })
            }}
            disabled={!form.community}
            className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[15px] text-on-surface focus:border-[#3d8bff] focus:outline-none focus:ring-2 focus:ring-[#3d8bff]/20 transition-all disabled:opacity-50"
          >
            <option value="">{form.community ? "请选择小区" : "请先选择社区"}</option>
            {villages.map((v) => (
              <option key={v.projectId} value={v.projectId}>{v.projectName}</option>
            ))}
          </select>
          {errors.village && <p className="mt-1.5 text-[12px] text-[#ba1a1a] font-medium">{errors.village}</p>}
        </div>
      </div> */}

      {/* 按钮 */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 rounded-2xl border border-white/60 bg-white/50 py-3.5 text-[14px] font-bold text-[#424754] transition-all hover:bg-white/70 active:scale-[0.98]"
        >
          取消
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#3d8bff] py-3.5 text-[14px] font-bold text-white shadow-lg shadow-[#3d8bff]/25 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-pulse">跳转中…</span>
          ) : (
            <>
              确认并上报
              <span className="material-symbols-outlined text-[18px] text-white">open_in_new</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
