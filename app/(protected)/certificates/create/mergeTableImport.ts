import * as XLSX from "xlsx"
import { matchHeaderToVariableId } from "./data"

export async function parseCertificateMergeFile(file: File): Promise<{
  rows: Record<string, string>[]
  rawHeaders: string[]
}> {
  const buf = await file.arrayBuffer()
  const wb = XLSX.read(buf, { type: "array" })
  const sheetName = wb.SheetNames[0]
  if (!sheetName) {
    return { rows: [], rawHeaders: [] }
  }
  const ws = wb.Sheets[sheetName]
  if (!ws) {
    return { rows: [], rawHeaders: [] }
  }

  const matrix = XLSX.utils.sheet_to_json<(string | number | boolean | undefined)[]>(ws, {
    header: 1,
    defval: "",
    raw: false,
  }) as (string | number | boolean | undefined)[][]

  if (!matrix.length) {
    return { rows: [], rawHeaders: [] }
  }

  const headerRow = matrix[0].map((c) => String(c ?? "").trim())
  const dataRows = matrix.slice(1).filter((r) => r.some((c) => String(c ?? "").trim() !== ""))

  const rows: Record<string, string>[] = dataRows.map((row) => {
    const obj: Record<string, string> = {}
    headerRow.forEach((h, i) => {
      const vid = matchHeaderToVariableId(h)
      if (!vid) return
      const cell = row[i]
      const s = cell == null ? "" : String(cell).trim()
      obj[vid] = s
    })
    return obj
  }).filter((r) => Object.keys(r).length > 0)

  return { rows, rawHeaders: headerRow }
}
