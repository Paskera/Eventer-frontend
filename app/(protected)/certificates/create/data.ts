export interface BaseLayer {
  id: string
  x: number
  y: number
  width: number
  height?: number
  rotation?: number
  opacity?: number
  pageIndex?: number
}

export interface TextLayer extends BaseLayer {
  type: "text"
  text: string
  fontSize: number
  fontFamily: string
  color: string
  alignment: "left" | "center" | "right"
  /** Якорь блока на холсте (только плавающие слои). Если не задан — как раньше, совпадает с alignment. */
  positionAnchor?: "left" | "center" | "right"
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
  isBackground?: boolean // Whether it's a fixed "Word-like" document text layer
}

/** Пресет размещения картинки относительно текста (как в Word) */
export type ImageTextWrapPreset = "inline" | "square" | "tight" | "topbottom" | "behind"

export interface ImageLayer extends BaseLayer {
  type: "image"
  src: string
  xPercent?: number
  yPercent?: number
  widthPercent?: number
  /** Доля высоты листа (для пересчёта при смене формата страницы) */
  heightPercent?: number
  /** Обтекание / порядок: «за текстом» рендерится под потоком текста */
  textWrapPreset?: ImageTextWrapPreset
}

export type Layer = TextLayer | ImageLayer

export const isTextLayer = (layer: Layer): layer is TextLayer => {
  return layer.type === "text" || layer.type === undefined
}

export function getTextLayerPositionAnchor(layer: TextLayer): "left" | "center" | "right" {
  return layer.positionAnchor ?? layer.alignment
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

/** Тип поля для подстановки из таблицы и подсказок в UI */
export type CertificateVariableKind = "text" | "number" | "date"

export interface CertificateVariable {
  id: string
  label: string
  kind: CertificateVariableKind
}

/** Раздел «Удостоверительные документы» — порядок как в макете */
export const VARIABLES: CertificateVariable[] = [
  { id: "participant_name", label: "Имя участника", kind: "text" },
  { id: "participant_place", label: "Место участника", kind: "number" },
  { id: "participant_team", label: "Команда участника", kind: "text" },
  { id: "participant_status", label: "Статус участника", kind: "text" },
  { id: "event_name", label: "Название мероприятия", kind: "text" },
  { id: "event_date", label: "Дата мероприятия", kind: "date" },
]

/** Сопоставление заголовков столбцов CSV/Excel с id переменной (рус/англ, без учёта регистра) */
export const VARIABLE_HEADER_ALIASES: Record<string, string[]> = {
  participant_name: [
    "имя участника",
    "имя",
    "фио",
    "participant_name",
    "name",
    "full_name",
    "full name",
    "fio",
    "участник",
  ],
  participant_place: [
    "место участника",
    "место",
    "место в рейтинге",
    "participant_place",
    "place",
    "degree",
    "rank",
    "место команды",
    "№ места",
    "номер места",
    "п/п",
    "место (номер)",
  ],
  participant_team: [
    "команда участника",
    "команда",
    "participant_team",
    "team_name",
    "team name",
    "team",
  ],
  participant_status: [
    "статус участника",
    "статус",
    "participant_status",
    "status",
  ],
  event_name: [
    "название мероприятия",
    "мероприятие",
    "event_name",
    "event name",
    "event",
    "название",
  ],
  event_date: [
    "дата мероприятия",
    "дата",
    "event_date",
    "event date",
    "date",
    "дата проведения",
    "дата и время",
    "когда",
  ],
}

export function normalizeVariableHeader(header: string): string {
  return header
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
}

export function matchHeaderToVariableId(header: string): string | undefined {
  const n = normalizeVariableHeader(header)
  if (!n) return undefined
  for (const v of VARIABLES) {
    if (normalizeVariableHeader(v.label) === n) return v.id
    const aliases = VARIABLE_HEADER_ALIASES[v.id] ?? []
    for (const a of aliases) {
      if (normalizeVariableHeader(a) === n) return v.id
    }
  }
  return undefined
}

export function variableKindLabel(kind: CertificateVariableKind): string {
  switch (kind) {
    case "number":
      return "число"
    case "date":
      return "дата"
    default:
      return "текст"
  }
}

export const TEMPLATE_CATEGORIES = [
  { value: "all", label: "Все" },
  { value: "certificate", label: "Сертификаты" },
  { value: "diploma", label: "Дипломы" },
  { value: "document", label: "Документы" },
  { value: "modern", label: "Современные" },
]

/** Рамка + угол: пропорции альбомного A4 297×210 (после загрузки шаблона слой тянется на весь лист) */
const SPECIALIST_LANDSCAPE_DECORATION_SRC =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="297" height="210" viewBox="0 0 297 210"><rect x="2.5" y="2.5" width="292" height="205" fill="none" stroke="#0c4a6e" stroke-width="2"/><polygon points="188,210 297,210 297,118" fill="#0c4a6e" fill-opacity="0.22"/></svg>',
  )

export interface Template {
  name: string
  description?: string
  category: string
  previewIcon?: string
  orientation?: "portrait" | "landscape"
  layers: Layer[]
}

export const TEMPLATES: Template[] = [
  {
    name: "Специалист.ru (Альбомный)",
    description: "Официальный сертификат центра «Специалист»",
    category: "certificate",
    previewIcon: "📜",
    orientation: "landscape",
    layers: [
      {
        id: "spec-decoration",
        type: "image",
        src: SPECIALIST_LANDSCAPE_DECORATION_SRC,
        x: 0,
        y: 0,
        width: 210,
        height: 297,
        opacity: 1,
      },
      {
        id: "logo-text",
        type: "text",
        text: "<div style='font-size:13px;margin-bottom:3px;color:#1e5a8a;letter-spacing:0.02em'>Бауманский учебный центр</div><div style='font-size:26px;font-weight:700;color:#0c4a6e;letter-spacing:-0.02em'>Специалист.ru</div><div style='font-size:11px;margin-top:2px;color:#3d7ab5'>Мировые стандарты обучения</div>",
        x: 105,
        y: 22,
        fontSize: 16,
        fontFamily: "sans-serif",
        color: "#0c4a6e",
        alignment: "center",
        width: 200,
      },
      {
        id: "main-title-line1",
        type: "text",
        text: "СЕРТИФИКАТ",
        x: 105,
        y: 54,
        fontSize: 42,
        fontFamily: "sans-serif",
        color: "#082f47",
        alignment: "center",
        width: 220,
        fontWeight: "bold",
        lineHeight: "1.05",
        letterSpacing: 2,
      },
      {
        id: "main-title-line2",
        type: "text",
        text: "НА ОБУЧЕНИЕ",
        x: 105,
        y: 78,
        fontSize: 34,
        fontFamily: "sans-serif",
        color: "#1a5276",
        alignment: "center",
        width: 220,
        fontWeight: "normal",
        lineHeight: "1.1",
        letterSpacing: 3,
      },
      {
        id: "subtitle",
        type: "text",
        text: "В БАУМАНСКОМ УЧЕБНОМ ЦЕНТРЕ «СПЕЦИАЛИСТ»",
        x: 105,
        y: 102,
        fontSize: 11,
        fontFamily: "sans-serif",
        color: "#2563a8",
        alignment: "center",
        width: 200,
        lineHeight: "1.35",
        letterSpacing: 1.2,
      },
      {
        id: "issued-label",
        type: "text",
        text: "ВЫДАН",
        x: 105,
        y: 118,
        fontSize: 9,
        fontFamily: "sans-serif",
        color: "#9ca3af",
        alignment: "center",
        width: 80,
        letterSpacing: 2,
      },
      {
        id: "line-top",
        type: "text",
        text: "————————————————————————————————————————————————————————————————————",
        x: 105,
        y: 126,
        fontSize: 9,
        fontFamily: "sans-serif",
        color: "#7eb8e0",
        alignment: "center",
        width: 200,
        opacity: 0.65,
      },
      {
        id: "name-placeholder",
        type: "text",
        text: "Иванову Ивану Ивановичу",
        x: 105,
        y: 134,
        fontSize: 32,
        fontFamily: "Georgia, serif",
        color: "#111827",
        alignment: "center",
        width: 200,
        fontStyle: "italic",
        lineHeight: "1.2",
      },
      {
        id: "line-middle",
        type: "text",
        text: "————————————————————————————————————————————————————————————————————",
        x: 105,
        y: 154,
        fontSize: 9,
        fontFamily: "sans-serif",
        color: "#7eb8e0",
        alignment: "center",
        width: 200,
        opacity: 0.65,
      },
      {
        id: "sum-label",
        type: "text",
        text: "НА СУММУ",
        x: 105,
        y: 162,
        fontSize: 9,
        fontFamily: "sans-serif",
        color: "#9ca3af",
        alignment: "center",
        width: 80,
        letterSpacing: 2,
      },
      {
        id: "amount",
        type: "text",
        text: "20 000 ₽",
        x: 105,
        y: 172,
        fontSize: 56,
        fontFamily: "sans-serif",
        color: "#0ea5e9",
        alignment: "center",
        width: 200,
        fontWeight: "300",
        lineHeight: "1",
        letterSpacing: 1,
      },
      {
        id: "director-label",
        type: "text",
        text: "——— ДИРЕКТОР ———",
        x: 45,
        y: 248,
        fontSize: 9,
        fontFamily: "sans-serif",
        color: "#9ca3af",
        alignment: "center",
        width: 56,
        letterSpacing: 0.5,
      },
      {
        id: "date-label",
        type: "text",
        text: "——— ДАТА ВЫДАЧИ ———",
        x: 105,
        y: 248,
        fontSize: 9,
        fontFamily: "sans-serif",
        color: "#9ca3af",
        alignment: "center",
        width: 56,
        letterSpacing: 0.5,
      },
      {
        id: "date-value",
        type: "text",
        text: "31.07.2023",
        x: 105,
        y: 236,
        fontSize: 13,
        fontFamily: "sans-serif",
        color: "#111827",
        alignment: "center",
        width: 80,
        fontWeight: "600",
      },
      {
        id: "order-label",
        type: "text",
        text: "——— КОД ЗАКАЗА ———",
        x: 165,
        y: 248,
        fontSize: 9,
        fontFamily: "sans-serif",
        color: "#9ca3af",
        alignment: "center",
        width: 56,
        letterSpacing: 0.5,
      },
      {
        id: "order-value",
        type: "text",
        text: "77777777",
        x: 165,
        y: 236,
        fontSize: 13,
        fontFamily: "sans-serif",
        color: "#111827",
        alignment: "center",
        width: 80,
        fontWeight: "600",
      },
    ],
  },
  {
    name: "Оранжевый Модерн (Портретный)",
    description: "Современный сертификат с яркими акцентами",
    category: "modern",
    previewIcon: "🎨",
    orientation: "portrait",
    layers: [
      {
        id: "company-logo",
        type: "text",
        text: "<strong>CompanyName</strong><br/><small>Your Slogan Here</small>",
        x: 150,
        y: 30,
        fontSize: 16,
        fontFamily: "sans-serif",
        color: "#1a1a1a",
        alignment: "right",
        width: 100,
      },
      {
        id: "modern-title",
        type: "text",
        text: "CERTIFICATE",
        x: 105,
        y: 80,
        fontSize: 48,
        fontFamily: "sans-serif",
        color: "#000000",
        alignment: "center",
        width: 180,
        fontWeight: "bold",
      },
      {
        id: "modern-subtitle",
        type: "text",
        text: "OF APPRECIATION",
        x: 105,
        y: 100,
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#333333",
        alignment: "center",
        width: 100,
      },
      {
        id: "presented-to",
        type: "text",
        text: "THIS CERTIFICATION IS PROUDLY PRESENTED TO:",
        x: 105,
        y: 135,
        fontSize: 12,
        fontFamily: "sans-serif",
        color: "#666666",
        alignment: "center",
        width: 150,
      },
      {
        id: "modern-name",
        type: "text",
        text: "John Smith",
        x: 105,
        y: 155,
        fontSize: 42,
        fontFamily: "cursive",
        color: "#f97316",
        alignment: "center",
        width: 180,
        fontWeight: "bold",
      },
      {
        id: "modern-description",
        type: "text",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        x: 105,
        y: 190,
        fontSize: 10,
        fontFamily: "sans-serif",
        color: "#666666",
        alignment: "center",
        width: 160,
      },
      {
        id: "modern-date-val",
        type: "text",
        text: "01 October, 2020",
        x: 50,
        y: 245,
        fontSize: 12,
        fontFamily: "sans-serif",
        color: "#1a1a1a",
        alignment: "center",
        width: 50,
      },
      {
        id: "modern-date-label",
        type: "text",
        text: "Date",
        x: 50,
        y: 235,
        fontSize: 10,
        fontFamily: "sans-serif",
        color: "#888888",
        alignment: "center",
        width: 30,
      },
      {
        id: "modern-director-val",
        type: "text",
        text: "Jonathan Smith",
        x: 160,
        y: 245,
        fontSize: 12,
        fontFamily: "sans-serif",
        color: "#1a1a1a",
        alignment: "center",
        width: 50,
      },
      {
        id: "modern-director-label",
        type: "text",
        text: "Director",
        x: 160,
        y: 235,
        fontSize: 10,
        fontFamily: "sans-serif",
        color: "#888888",
        alignment: "center",
        width: 30,
      },
    ],
  },
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
