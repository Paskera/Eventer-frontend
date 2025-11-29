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
  lineHeight?: number
  letterSpacing?: number
  borderWidth?: number
  borderColor?: string
  opacity?: number
}

export const VARIABLES = [
  { id: "name", label: "{{NAME}}" },
  { id: "date", label: "{{DATE}}" },
  { id: "score", label: "{{SCORE}}" },
  { id: "signature", label: "{{SIGNATURE}}" },
]

export const FONTS = [
  { value: "serif", label: "Serif" },
  { value: "sans-serif", label: "Sans Serif" },
  { value: "monospace", label: "Monospace" },
]

export const TEMPLATES = [
  {
    name: "Classic",
    layers: [
      {
        id: "1",
        text: "Certificate of Achievement",
        x: 105,
        y: 30,
        fontSize: 24,
        fontFamily: "serif",
        color: "#1a365d",
        alignment: "center" as const,
        width: 100,
      },
      {
        id: "2",
        text: "This certifies that",
        x: 105,
        y: 90,
        fontSize: 12,
        fontFamily: "serif",
        color: "#2d3748",
        alignment: "center" as const,
        width: 100,
      },
      {
        id: "3",
        text: "{{NAME}}",
        x: 105,
        y: 125,
        fontSize: 16,
        fontFamily: "serif",
        color: "#1a365d",
        alignment: "center" as const,
        width: 100,
      },
      {
        id: "4",
        text: "has successfully completed",
        x: 105,
        y: 175,
        fontSize: 10,
        fontFamily: "serif",
        color: "#2d3748",
        alignment: "center" as const,
        width: 100,
      },
      {
        id: "5",
        text: "{{COURSE}}",
        x: 105,
        y: 210,
        fontSize: 14,
        fontFamily: "serif",
        color: "#1a365d",
        alignment: "center" as const,
        width: 100,
      },
      {
        id: "6",
        text: "Date: {{DATE}}",
        x: 105,
        y: 260,
        fontSize: 8,
        fontFamily: "sans-serif",
        color: "#4a5568",
        alignment: "center" as const,
        width: 100,
      },
    ],
  },
  {
    name: "Modern",
    layers: [
      {
        id: "1",
        text: "CERTIFICATE",
        x: 105,
        y: 35,
        fontSize: 28,
        fontFamily: "sans-serif",
        color: "#0066cc",
        alignment: "center" as const,
        width: 100,
      },
      {
        id: "2",
        text: "Awarded to",
        x: 105,
        y: 100,
        fontSize: 10,
        fontFamily: "sans-serif",
        color: "#666666",
        alignment: "center" as const,
        width: 100,
      },
      {
        id: "3",
        text: "{{NAME}}",
        x: 105,
        y: 140,
        fontSize: 18,
        fontFamily: "sans-serif",
        color: "#0066cc",
        alignment: "center" as const,
        width: 100,
      },
      {
        id: "4",
        text: "For {{ACHIEVEMENT}}",
        x: 105,
        y: 190,
        fontSize: 12,
        fontFamily: "sans-serif",
        color: "#333333",
        alignment: "center" as const,
        width: 180,
      },
      {
        id: "5",
        text: "{{DATE}}",
        x: 105,
        y: 250,
        fontSize: 7,
        fontFamily: "sans-serif",
        color: "#999999",
        alignment: "center" as const,
        width: 180,
      },
    ],
  },
]
