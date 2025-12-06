export interface TextLayer {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  fontFamily: string
  color: string
  alignment: "left" | "center" | "right"
  width: number
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
  lineHeight?: string
  letterSpacing?: number
  borderWidth?: number
  borderColor?: string
  opacity?: number
  xPercent?: number
  yPercent?: number
  widthPercent?: number
}

export const FONTS = [
  { value: "sans-serif", label: "Sans Serif" },
  { value: "serif", label: "Serif" },
  { value: "monospace", label: "Monospace" },
  { value: "cursive", label: "Cursive" },
  { value: "fantasy", label: "Fantasy" },
]

export const VARIABLES = [
  { id: "name", label: "Имя участника" },
  { id: "event", label: "Название мероприятия" },
  { id: "date", label: "Дата" },
  { id: "signature", label: "Подпись" },
]

export const TEMPLATES = [
  {
    name: "Классический",
    // Note: All coordinates are based on A4 format (210mm × 297mm)
    layers: [
      {
        id: "1",
        text: "Сертификат об участии",
        x: 105, // center of A4 width (210mm)
        y: 50,
        fontSize: 48,
        fontFamily: "serif",
        color: "#1a1a1a",
        alignment: "center" as const,
        width: 180,
      },
      {
        id: "2",
        text: "Награждается",
        x: 105,
        y: 120,
        fontSize: 24,
        fontFamily: "serif",
        color: "#333333",
        alignment: "center" as const,
        width: 140,
      },
      {
        id: "3",
        text: "Имя участника",
        x: 105,
        y: 160,
        fontSize: 36,
        fontFamily: "cursive",
        color: "#0066cc",
        alignment: "center" as const,
        width: 180,
      },
    ],
  },
]
