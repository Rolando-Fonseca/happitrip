"use client"

import * as React from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { RUTAS } from "@/lib/rutas"
import { cn } from "@/lib/utils"

export function RutasCarrusel() {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  })
  const [activa, setActiva] = React.useState(0)
  const [puedeAtras, setPuedeAtras] = React.useState(false)
  const [puedeDelante, setPuedeDelante] = React.useState(false)

  const sincronizar = React.useCallback(() => {
    if (!embla) return
    setActiva(embla.selectedScrollSnap())
    setPuedeAtras(embla.canScrollPrev())
    setPuedeDelante(embla.canScrollNext())
  }, [embla])

  React.useEffect(() => {
    if (!embla) return
    sincronizar()
    embla.on("select", sincronizar).on("reInit", sincronizar)
    return () => {
      embla.off("select", sincronizar).off("reInit", sincronizar)
    }
  }, [embla, sincronizar])

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex gap-4">
          {RUTAS.map((ruta, i) => (
            <li
              key={ruta.slug}
              className="min-w-0 shrink-0 basis-[68%] sm:basis-[42%] lg:basis-[31%]"
            >
              <a
                href="#rutas"
                aria-label={`Ruta ${ruta.nombre}: ${ruta.ciudades.join(", ")}. ${ruta.dias} días desde ${ruta.precioDesde} euros`}
                className={cn(
                  "group relative block aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/15 transition-all duration-500",
                  activa === i ? "opacity-100" : "opacity-75 hover:opacity-100"
                )}
              >
                <Image
                  src={ruta.imagen}
                  alt={ruta.alt}
                  fill
                  sizes="(max-width: 640px) 68vw, (max-width: 1024px) 42vw, 31vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="dato text-[9px] text-ambar">
                    {ruta.dias} días · desde {ruta.precioDesde} €
                  </p>
                  <h3 className="titular mt-1.5 text-lg text-white">
                    {ruta.nombre}
                  </h3>
                  <p className="mt-1 text-[11px] leading-snug text-white/70">
                    {ruta.ciudades.join(" · ")}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            disabled={!puedeAtras}
            aria-label="Ruta anterior"
            className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-ambar hover:text-ambar disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            disabled={!puedeDelante}
            aria-label="Ruta siguiente"
            className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-ambar hover:text-ambar disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        <p className="dato text-xs text-white/60" aria-live="polite">
          <span className="text-ambar">
            {String(activa + 1).padStart(2, "0")}
          </span>
          <span className="mx-1.5">/</span>
          {String(RUTAS.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  )
}
