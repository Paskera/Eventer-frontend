import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"
import path from "path"

export default defineConfig({
  // React-бандл/зависимости в нашем library-build иногда обращаются к `process.env.NODE_ENV`.
  // В браузере `process` не существует, поэтому подставляем значение на этапе сборки,
  // чтобы в итоговом бандле не осталось `process` как глобальной переменной.
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
  },
  plugins: [react(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ".."),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "./document-constructor/boot.ts"),
      name: "DocumentConstructorWC",
      formats: ["es"],
      fileName: "document-constructor",
    },
    rollupOptions: {
      output: {
        entryFileNames: "document-constructor.js",
        // Allow dynamic imports to stay dynamic (so heavy deps like `docx`
        // don't run on initial load).
        inlineDynamicImports: false,
        chunkFileNames: "[name]-[hash].js",
      },
    },
  },
})

