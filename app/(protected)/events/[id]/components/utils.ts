import { format } from "date-fns"
import { ru } from "date-fns/locale"

export function parseEventDate(dateStr: string): Date | null {
  if (!dateStr) return null
  const isoDate = new Date(dateStr)
  if (!isNaN(isoDate.getTime())) return isoDate
  const [datePart, timePart] = dateStr.split(" ")
  if (!datePart || !timePart) return null
  const [day, month, year] = datePart.split(".").map(Number)
  const [hours, minutes, seconds] = timePart.split(":").map(Number)
  const customDate = new Date(year, month - 1, day, hours, minutes, seconds)
  if (!isNaN(customDate.getTime())) return customDate
  return null
}

export function formatEventDate(dateStr: string) {
  const date = parseEventDate(dateStr)
  if (!date) return ""
  return format(date, "d MMMM yyyy, HH:mm", { locale: ru })
}
