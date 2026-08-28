import { CalendarDays, Route, Mail } from "lucide-react"

import { Revelar } from "@/components/site/revelar"

const PASOS = [
  {
    icono: CalendarDays,
    titulo: "Cuéntanos tus límites",
    texto:
      "Cuántos días libres tienes, cuánto puedes gastar y desde qué ciudad sales. Tres campos, medio minuto.",
  },
  {
    icono: Route,
    titulo: "Cuadramos la ruta",
    texto:
      "Elegimos el orden de las ciudades para que los trayectos salgan baratos, buscamos camas y ajustamos el gasto a tu tope.",
  },
  {
    icono: Mail,
    titulo: "Te llega en 24 horas",
    texto:
      "Recibes el itinerario día a día, con trenes, alojamiento y lo que cuesta cada tramo. Si algo no encaja, lo cambiamos.",
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-crema py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Revelar>
          <p className="dato flex items-center gap-3 text-[11px] text-rojo">
          <span aria-hidden className="h-px w-8 bg-rojo" />
            Cómo funciona
          </p>

          <h2 className="titular mt-5 max-w-2xl text-h1 text-navy">
            Tú pones los límites.
            <br />
            Nosotros, el itinerario.
          </h2>
        </Revelar>

        <ol className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {PASOS.map((paso, i) => (
            <li key={paso.titulo}>
              <Revelar className="relative" retraso={i * 0.06}>
              <div className="flex items-center gap-4">
                <span className="dato text-xs text-rojo">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px flex-1 bg-border" />
              </div>

              <paso.icono
                aria-hidden
                className="mt-6 size-7 text-rojo"
                strokeWidth={1.5}
              />

              <h3 className="titular mt-4 text-xl text-navy">{paso.titulo}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {paso.texto}
              </p>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
