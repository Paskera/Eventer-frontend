import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "sonner"

import "../../app/globals.css"

console.log("[document-constructor] entry loaded")

import type { DocumentConstructorInitialState } from "../../app/(protected)/certificates/create/DocumentConstructor"
import { DocumentConstructor } from "../../app/(protected)/certificates/create/DocumentConstructor"

type ConstructorSaveDetail = {
  docId?: string
  state: DocumentConstructorInitialState
}

declare global {
  interface HTMLElementTagNameMap {
    "document-constructor": DocumentConstructorElement
  }
}

export class DocumentConstructorElement extends HTMLElement {
  private root: ReactDOM.Root | null = null
  private _initialState: DocumentConstructorInitialState | null = null
  private didReadyDispatched = false

  static get observedAttributes() {
    return ["doc-id"]
  }

  get initialState(): DocumentConstructorInitialState | null {
    return this._initialState
  }

  set initialState(state: DocumentConstructorInitialState | null) {
    console.log("[document-constructor] setter initialState called", state)
    this._initialState = state
    this.render()
  }

  connectedCallback() {
    console.log("[document-constructor] connectedCallback()")
    this._upgradeProperty("initialState")
    // Render when initialState is provided.
    if (!this.style.display) this.style.display = "block"
    this.render()
  }

  private _upgradeProperty(prop: string) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = (this as any)[prop]
      delete (this as any)[prop]
      ;(this as any)[prop] = value
    }
  }

  disconnectedCallback() {
    this.root?.unmount()
    this.root = null
  }

  private render() {
    if (!this._initialState) return
    console.log("[document-constructor] render()", this._initialState)

    if (!this.root) {
      this.root = ReactDOM.createRoot(this)
    }

    const initialState = this._initialState

    if (!this.didReadyDispatched) {
      this.didReadyDispatched = true
      this.dispatchEvent(
        new CustomEvent("constructor-ready", {
          detail: { docId: this.getAttribute("doc-id") ?? undefined },
        }),
      )
    }

    try {
      this.root!.render(
        <>
          <Toaster />
          <DocumentConstructor
            initialState={initialState}
            onSave={(state) => {
              this.dispatchEvent(
                new CustomEvent("constructor-save", {
                  detail: {
                    docId: this.getAttribute("doc-id") ?? undefined,
                    state,
                  },
                }),
              )
            }}
          />
        </>,
      )
    } catch (err) {
      console.error("[document-constructor] error during render:", err)
      this.dispatchEvent(
        new CustomEvent("constructor-error", {
          detail: {
            message: err instanceof Error ? err.message : String(err),
          },
        }),
      )
    }
  }
}
