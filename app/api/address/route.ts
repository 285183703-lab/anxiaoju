import { NextResponse } from "next/server"

const BASE_PATH = "https://www.hzrongzhi.com:9443/hfms"

type OptionItem = {
  id: string
  itemKey: string
  itemValue: string
}

type VillageItem = {
  cityCd: string
  cityName: string
  commlityCd: string
  commlityName: string
  projectCod: string
  projectId: string
  projectName: string
}

// 获取街道列表
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") // street | community | village

  try {
    if (type === "street") {
      const res = await fetch(
        `${BASE_PATH}/globalInfoApp.action?classInfo=DATADIC_YG&pathValue=%E9%80%9A%E7%94%A8%E5%AD%97%E5%85%B8%3E%E5%8C%BA%E5%9F%9F`
      )
      const data = await res.json()
      const streets: OptionItem[] = data.data ?? []
      return NextResponse.json({
        list: streets.map((s) => ({
          key: s.itemKey,
          label: s.itemValue,
          id: s.id,
        })),
      })
    }

    if (type === "community") {
      const cityKey = searchParams.get("cityKey")
      if (!cityKey) {
        return NextResponse.json({ list: [] })
      }
      const res = await fetch(
        `${BASE_PATH}/globalInfoApp.action?classInfo=DATADIC_YG&pathValue=%E9%80%9A%E7%94%A8%E5%AD%97%E5%85%B8%3E%E5%8C%BA%E5%9F%9F&lastLevelKey=${cityKey}`
      )
      const data = await res.json()
      const communities: OptionItem[] = data.data ?? []
      return NextResponse.json({
        list: communities.map((c) => ({
          key: c.itemKey,
          label: c.itemValue,
          id: c.id,
        })),
      })
    }

    if (type === "village") {
      const cityCd = searchParams.get("cityCd")
      const commlityCd = searchParams.get("commlityCd")
      if (!cityCd || !commlityCd) {
        return NextResponse.json({ list: [] })
      }
      const res = await fetch(
        `${BASE_PATH}/projectInfoApp.action?classInfo=PROJLISTSELTEVAL_YG&cityCd=${cityCd}&commlityCd=${commlityCd}`
      )
      const data = await res.json()
      const villages: VillageItem[] = data.data ?? []
      return NextResponse.json({
        list: villages.map((v) => ({
          projectId: v.projectId,
          projectName: v.projectName,
          cityCd: v.cityCd,
          commlityCd: v.commlityCd,
          cityName: v.cityName,
          commlityName: v.commlityName,
        })),
      })
    }

    return NextResponse.json({ list: [] })
  } catch (e) {
    console.error("[address-api]", e)
    return NextResponse.json({ list: [], error: "获取地址数据失败" }, { status: 500 })
  }
}
