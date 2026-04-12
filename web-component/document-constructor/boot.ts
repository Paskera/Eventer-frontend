// Этот файл является entrypoint'ом для сборки web-component (Vite lib mode).
// Важно: сначала подложим `globalThis.process`, затем уже динамически загрузим entry с React.
// Иначе React может обратиться к `process.env.NODE_ENV` ещё до выполнения полифилла.
;(globalThis as any).process =
  (globalThis as any).process ?? { env: { NODE_ENV: "production" } }

if (!customElements.get("document-constructor")) {
  void import("./entry").then((mod) => {
    const DocumentConstructorElement = mod.DocumentConstructorElement
    customElements.define("document-constructor", DocumentConstructorElement)
  })
}
