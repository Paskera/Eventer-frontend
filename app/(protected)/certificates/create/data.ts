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
        x: 50,
        y: 60,
        fontSize: 48,
        fontFamily: "serif",
        color: "#1a365d",
        alignment: "center" as const,
        width: 700,
      },
      {
        id: "2",
        text: "This certifies that",
        x: 50,
        y: 180,
        fontSize: 20,
        fontFamily: "serif",
        color: "#2d3748",
        alignment: "center" as const,
        width: 700,
      },
      {
        id: "3",
        text: "{{NAME}}",
        x: 50,
        y: 250,
        fontSize: 32,
        fontFamily: "serif",
        color: "#1a365d",
        alignment: "center" as const,
        width: 700,
      },
      {
        id: "4",
        text: "has successfully completed",
        x: 50,
        y: 350,
        fontSize: 18,
        fontFamily: "serif",
        color: "#2d3748",
        alignment: "center" as const,
        width: 700,
      },
      {
        id: "5",
        text: "{{COURSE}}",
        x: 50,
        y: 420,
        fontSize: 28,
        fontFamily: "serif",
        color: "#1a365d",
        alignment: "center" as const,
        width: 700,
      },
      {
        id: "6",
        text: "Date: {{DATE}}",
        x: 50,
        y: 520,
        fontSize: 16,
        fontFamily: "sans-serif",
        color: "#4a5568",
        alignment: "center" as const,
        width: 700,
      },
    ],
  },
  {
    name: "Modern",
    layers: [
      {
        id: "1",
        text: "CERTIFICATE",
        x: 50,
        y: 70,
        fontSize: 56,
        fontFamily: "sans-serif",
        color: "#0066cc",
        alignment: "center" as const,
        width: 700,
      },
      {
        id: "2",
        text: "Awarded to",
        x: 50,
        y: 200,
        fontSize: 18,
        fontFamily: "sans-serif",
        color: "#666",
        alignment: "center" as const,
        width: 700,
      },
      {
        id: "3",
        text: "{{NAME}}",
        x: 50,
        y: 280,
        fontSize: 36,
        fontFamily: "sans-serif",
        color: "#0066cc",
        alignment: "center" as const,
        width: 700,
      },
      {
        id: "4",
        text: "For {{ACHIEVEMENT}}",
        x: 50,
        y: 380,
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#333",
        alignment: "center" as const,
        width: 700,
      },
      {
        id: "5",
        text: "{{DATE}}",
        x: 50,
        y: 500,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#999",
        alignment: "center" as const,
        width: 700,
      },
    ],
  },
]