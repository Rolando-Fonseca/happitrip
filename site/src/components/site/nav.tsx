"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { cn } from "@/lib/utils"

const ENLACES = [
  { href: "#rutas", texto: "Rutas" },
  { href: "#como-funciona", texto: "Cómo funciona" },
  { href: "#opiniones", texto: "Opiniones" },
]

export function Nav() {
  const [abierto, setAbierto] = React.useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* Franja ámbar: el detalle superior de la referencia. */}
      <div className="h-1 bg-ambar" />

      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-white"
      >
        <a href="#" className="flex items-center" aria-label="HappiTrip, inicio">
          <Logo />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {ENLACES.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                className="dato text-[11px] text-white/80 transition-colors hover:text-ambar"
              >
                {e.texto}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="ambar" size="sm">
            <a href="#planea">Planea tu ruta</a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          className="cursor-pointer p-2 md:hidden"
        >
          {abierto ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <div
        id="menu-movil"
        hidden={!abierto}
        className={cn(
          "mx-6 rounded-xl border border-white/15 bg-navy/95 p-5 backdrop-blur md:hidden"
        )}
      >
        <ul className="flex flex-col gap-4">
          {ENLACES.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                onClick={() => setAbierto(false)}
                className="dato text-xs text-white/80"
              >
                {e.texto}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild variant="ambar" className="mt-5 w-full">
          <a href="#planea" onClick={() => setAbierto(false)}>
            Planea tu ruta
          </a>
        </Button>
      </div>
    </header>
  )
}
