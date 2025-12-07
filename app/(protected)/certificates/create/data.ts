export interface BaseLayer {
  id: string
  x: number
  y: number
  width: number
  height?: number
  rotation?: number
  opacity?: number
}

export interface TextLayer extends BaseLayer {
  type: "text"
  text: string
  fontSize: number
  fontFamily: string
  color: string
  alignment: "left" | "center" | "right"
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
  lineHeight?: string
  letterSpacing?: number
  borderWidth?: number
  borderColor?: string
  xPercent?: number
  yPercent?: number
  widthPercent?: number
  listType?: "none" | "bullet" | "number"
  headingLevel?: "normal" | "h1" | "h2" | "h3"
}

export interface ImageLayer extends BaseLayer {
  type: "image"
  src: string
  xPercent?: number
  yPercent?: number
  widthPercent?: number
}

export type Layer = TextLayer | ImageLayer

export const isTextLayer = (layer: Layer): layer is TextLayer => {
  return layer.type === "text" || layer.type === undefined
}

export const isImageLayer = (layer: Layer): layer is ImageLayer => {
  return layer.type === "image"
}

export const isTableLayer = (layer: any): boolean => {
  return layer.type === "table"
}

export const isHyperlinkLayer = (layer: any): boolean => {
  return layer.type === "hyperlink"
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
  { id: "role", label: "Роль" },
  { id: "team", label: "Команда" },
]

export const TEMPLATE_CATEGORIES = [
  { value: "all", label: "Все" },
  { value: "certificate", label: "Сертификаты" },
  { value: "diploma", label: "Дипломы" },
  { value: "document", label: "Документы" },
  { value: "modern", label: "Современные" },
]

export interface Template {
  name: string
  description?: string
  category: string
  previewIcon?: string
  layers: TextLayer[]
}

export const TEMPLATES: Template[] = [
  {
    name: "Классический сертификат",
    description: "Стандартный шаблон сертификата об участии",
    category: "certificate",
    previewIcon: "📜",
    layers: [
      {
        id: "1",
        type: "text",
        text: "Сертификат об участии",
        x: 105,
        y: 50,
        fontSize: 48,
        fontFamily: "serif",
        color: "#1a1a1a",
        alignment: "center",
        width: 180,
        fontWeight: "bold",
      },
      {
        id: "2",
        type: "text",
        text: "Награждается",
        x: 105,
        y: 120,
        fontSize: 24,
        fontFamily: "serif",
        color: "#333333",
        alignment: "center",
        width: 140,
      },
      {
        id: "3",
        type: "text",
        text: "Имя участника",
        x: 105,
        y: 150,
        fontSize: 36,
        fontFamily: "cursive",
        color: "#0066cc",
        alignment: "center",
        width: 180,
      },
      {
        id: "4",
        type: "text",
        text: "за успешное участие в мероприятии",
        x: 105,
        y: 180,
        fontSize: 18,
        fontFamily: "sans-serif",
        color: "#555555",
        alignment: "center",
        width: 160,
      },
      {
        id: "5",
        type: "text",
        text: "Название мероприятия",
        x: 105,
        y: 200,
        fontSize: 28,
        fontFamily: "sans-serif",
        color: "#1a1a1a",
        alignment: "center",
        width: 180,
        fontWeight: "bold",
      },
      {
        id: "6",
        type: "text",
        text: "Дата",
        x: 50,
        y: 250,
        fontSize: 16,
        fontFamily: "sans-serif",
        color: "#333333",
        alignment: "left",
        width: 60,
      },
      {
        id: "7",
        type: "text",
        text: "Подпись организатора",
        x: 160,
        y: 250,
        fontSize: 16,
        fontFamily: "cursive",
        color: "#333333",
        alignment: "right",
        width: 60,
      },
    ],
  },
  {
    name: "Современный диплом",
    description: "Стильный диплом в минималистичном стиле",
    category: "modern",
    previewIcon: "🎓",
    layers: [
      {
        id: "1",
        type: "text",
        text: "ДИПЛОМ",
        x: 105,
        y: 40,
        fontSize: 60,
        fontFamily: "sans-serif",
        color: "#000000",
        alignment: "center",
        width: 180,
        fontWeight: "bold",
        letterSpacing: 5,
      },
      {
        id: "2",
        type: "text",
        text: "ВРУЧАЕТСЯ",
        x: 105,
        y: 70,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#666666",
        alignment: "center",
        width: 100,
        letterSpacing: 2,
      },
      {
        id: "3",
        type: "text",
        text: "Имя Фамилия",
        x: 105,
        y: 110,
        fontSize: 42,
        fontFamily: "sans-serif",
        color: "#2563eb",
        alignment: "center",
        width: 190,
        fontWeight: "bold",
      },
      {
        id: "4",
        type: "text",
        text: "За занятое 1 место в хакатоне",
        x: 105,
        y: 140,
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#333333",
        alignment: "center",
        width: 160,
      },
      {
        id: "5",
        type: "text",
        text: "Tech Event 2024",
        x: 105,
        y: 160,
        fontSize: 24,
        fontFamily: "sans-serif",
        color: "#000000",
        alignment: "center",
        width: 160,
        fontWeight: "bold",
      },
    ],
  },
  {
    name: "Официальный документ",
    description: "Шаблон для служебных записок и приказов",
    category: "document",
    previewIcon: "📄",
    layers: [
      {
        id: "1",
        type: "text",
        text: "ШАПКА ОРГАНИЗАЦИИ",
        x: 105,
        y: 20,
        fontSize: 16,
        fontFamily: "serif",
        color: "#000000",
        alignment: "center",
        width: 180,
        fontWeight: "bold",
      },
      {
        id: "2",
        type: "text",
        text: "ПРИКАЗ",
        x: 105,
        y: 50,
        fontSize: 24,
        fontFamily: "serif",
        color: "#000000",
        alignment: "center",
        width: 100,
        fontWeight: "bold",
      },
      {
        id: "3",
        type: "text",
        text: "№ ____ от «__» _______ 20__ г.",
        x: 105,
        y: 60,
        fontSize: 14,
        fontFamily: "serif",
        color: "#000000",
        alignment: "center",
        width: 100,
      },
      {
        id: "4",
        type: "text",
        text: "О проведении мероприятия",
        x: 105,
        y: 80,
        fontSize: 16,
        fontFamily: "serif",
        color: "#000000",
        alignment: "center",
        width: 160,
      },
      {
        id: "5",
        type: "text",
        text: "В связи с необходимостью организации...",
        x: 20,
        y: 100,
        fontSize: 14,
        fontFamily: "serif",
        color: "#000000",
        alignment: "left",
        width: 170,
      },
    ],
  },
  {
    name: "Похвальная грамота",
    description: "Яркая грамота для награждения",
    category: "diploma",
    previewIcon: "🏆",
    layers: [
      {
        id: "1",
        type: "text",
        text: "ГРАМОТА",
        x: 105,
        y: 40,
        fontSize: 56,
        fontFamily: "serif",
        color: "#dc2626",
        alignment: "center",
        width: 180,
        fontWeight: "bold",
      },
      {
        id: "2",
        type: "text",
        text: "За отличные успехи",
        x: 105,
        y: 80,
        fontSize: 28,
        fontFamily: "serif",
        color: "#b91c1c",
        alignment: "center",
        width: 160,
      },
      {
        id: "3",
        type: "text",
        text: "Награждается",
        x: 105,
        y: 110,
        fontSize: 20,
        fontFamily: "serif",
        color: "#333333",
        alignment: "center",
        width: 140,
      },
      {
        id: "4",
        type: "text",
        text: "Имя Участника",
        x: 105,
        y: 140,
        fontSize: 40,
        fontFamily: "cursive",
        color: "#000000",
        alignment: "center",
        width: 180,
      },
    ],
  },
]
