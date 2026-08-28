import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { RUTAS } from "@/lib/rutas"
import { Revelar } from "@/components/site/revelar"

export function RutasSeccion() {
  return (
    <section id="rutas" className="dark bg-navy py-24 text-crema sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Revelar>
          <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="dato flex items-center gap-3 text-[11px] text-ambar">
              <span aria-hidden className="h-px w-8 bg-ambar" />
              Cuatro rutas para empezar
            </p>
            <h2 className="titular mt-5 max-w-2xl text-h1 uppercase">
              Elige una y la<br />adaptamos a ti
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-crema/60">
            Son puntos de partida, no paquetes cerrados. Cambiamos ciudades,
            alargamos días o recortamos el gasto según lo que necesites.
            </p>
          </div>
        </Revelar>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RUTAS.map((ruta, i) => (
            <li key={ruta.slug}>
              <Revelar retraso={i * 0.06}>
              <article className="group h-full">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={ruta.imagen}
                    alt={ruta.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent"
                  />
                  <p className="dato absolute bottom-4 left-4 text-[9px] text-ambar">
                    {ruta.dias} días · desde {ruta.precioDesde} €
                  </p>
                </div>

                <h3 className="titular mt-5 flex items-center gap-1.5 text-xl">
                  {ruta.nombre}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-ambar transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </h3>
                <p className="dato mt-2 text-[9px] text-crema/65">{ruta.pais}</p>
                <p className="mt-3 text-sm leading-relaxed text-crema/65">
                  {ruta.resumen}
                </p>
                <p className="mt-4 text-xs leading-relaxed text-crema/60">
                  {ruta.ciudades.join(" → ")}
                </p>
              </article>
              </Revelar>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-xs text-crema/55">
          Precios estimados para viaje low cost: pase de tren, hostal y comida.
          No incluyen vuelos hasta el punto de salida.
        </p>
      </div>
    </section>
  )
}
