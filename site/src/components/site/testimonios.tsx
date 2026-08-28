/**
 * Testimonios de muestra. No son opiniones reales: la sección se marca
 * como contenido de ejemplo para no presentar reseñas inventadas como
 * auténticas. Sustituir en cuanto haya viajeros de verdad.
 */
const OPINIONES = [
  {
    cita:
      "Llevaba tres semanas con un Excel que no cuadraba. Me lo devolvieron hecho en un día y encima me sobraron ciento veinte euros.",
    nombre: "Nombre de ejemplo",
    detalle: "La Clásica · 14 días",
  },
  {
    cita:
      "Lo que más me sirvió fue el orden de las ciudades. Yo lo tenía al revés y me habría comido seis horas de tren de más.",
    nombre: "Nombre de ejemplo",
    detalle: "La Mediterránea · 12 días",
  },
  {
    cita:
      "Les dije que iba justo de dinero y no me vendieron nada caro. Me ajustaron la ruta y ya está.",
    nombre: "Nombre de ejemplo",
    detalle: "La Atlántica · 11 días",
  },
]

import { Revelar } from "@/components/site/revelar"

export function Testimonios() {
  return (
    <section id="opiniones" className="bg-crema py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center gap-4">
          <p className="dato flex items-center gap-3 text-[11px] text-rojo">
            <span aria-hidden className="h-px w-8 bg-rojo" />
            Opiniones
          </p>
          <span className="dato rounded-full border border-border px-3 py-1 text-[9px] text-muted-foreground">
            Contenido de ejemplo
          </span>
        </div>

        <h2 className="titular mt-5 max-w-2xl text-h1 text-navy">
          Lo que dirán cuando
          <br />
          haya gente que contarlo.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Estas citas son de muestra, no de viajeros reales. Van aquí para ver
          cómo queda la sección y se sustituyen con las primeras opiniones de
          verdad.
        </p>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {OPINIONES.map((o, i) => (
            <li key={i}>
              <Revelar
                retraso={i * 0.06}
                className="flex h-full flex-col rounded-2xl border border-border bg-white p-7"
              >
              <p className="font-quote text-[17px] leading-relaxed text-navy italic">
                «{o.cita}»
              </p>
              <div className="mt-auto pt-7">
                <p className="text-sm font-semibold text-navy">{o.nombre}</p>
                <p className="dato mt-1.5 text-[9px] text-muted-foreground">
                  {o.detalle}
                </p>
                </div>
              </Revelar>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
