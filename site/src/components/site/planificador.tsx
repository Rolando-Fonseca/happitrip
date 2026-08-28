"use client"

import * as React from "react"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

// TODO: sustituir por el correo real del negocio.
const CORREO = "hola@happitrip.com"

// TODO: para recibir los envíos sin abrir el cliente de correo,
// crear un formulario gratuito en formspree.io y poner aquí el ID
// (algo como "xpznqkdl"). Mientras esté vacío se usa mailto:.
const FORMSPREE_ID = ""

const DIAS = ["7 a 10 días", "10 a 14 días", "14 a 21 días", "Más de 21 días"]
const PRESUPUESTOS = [
  "Menos de 600 €",
  "600 – 900 €",
  "900 – 1.300 €",
  "Más de 1.300 €",
]

const campoBase =
  "h-12 w-full rounded-lg border border-border bg-white px-4 text-[15px] text-navy outline-none transition-colors focus:border-rojo focus:ring-2 focus:ring-rojo/25"

export function Planificador() {
  const [enviando, setEnviando] = React.useState(false)
  const [enviado, setEnviado] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function alEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setError(null)

    const datos = new FormData(evento.currentTarget)
    const dias = String(datos.get("dias") ?? "")
    const presupuesto = String(datos.get("presupuesto") ?? "")
    const salida = String(datos.get("salida") ?? "")
    const email = String(datos.get("email") ?? "")

    if (!FORMSPREE_ID) {
      const cuerpo = [
        `Días disponibles: ${dias}`,
        `Presupuesto: ${presupuesto}`,
        `Salgo desde: ${salida}`,
        `Mi correo: ${email}`,
      ].join("\n")
      window.location.href = `mailto:${CORREO}?subject=${encodeURIComponent(
        "Quiero mi Eurotrip"
      )}&body=${encodeURIComponent(cuerpo)}`
      setEnviado(true)
      return
    }

    setEnviando(true)
    try {
      const respuesta = await fetch(
        `https://formspree.io/f/${FORMSPREE_ID}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: datos,
        }
      )
      if (!respuesta.ok) throw new Error("Respuesta no válida")
      setEnviado(true)
    } catch {
      setError(
        `No hemos podido enviarlo. Escríbenos directamente a ${CORREO} y lo resolvemos.`
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="planea" className="bg-crema-hondo py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <p className="dato flex items-center gap-3 text-[11px] text-rojo">
            <span aria-hidden className="h-px w-8 bg-rojo" />
            Planea tu ruta
          </p>
          <h2 className="titular mt-5 text-h1 text-navy">
            Tres preguntas y
            <br />
            te lo montamos.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Todavía no hay botón mágico: los primeros itinerarios los hacemos a
            mano, uno a uno. Por eso tardamos 24 horas y por eso salen bien.
          </p>
          <p className="dato mt-8 text-[10px] text-muted-foreground">
            Respuesta en 24 h · Gratis · Sin compromiso
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-7 sm:p-9">
          {enviado ? (
            <div className="flex flex-col items-start gap-4 py-6">
              <span className="grid size-11 place-items-center rounded-full bg-rojo text-white">
                <Check className="size-5" />
              </span>
              <h3 className="titular text-xl text-navy">Recibido.</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Te escribimos en menos de 24 horas con tu itinerario. Si no
                llega, mira en spam antes de darnos por perdidos.
              </p>
            </div>
          ) : (
            <form onSubmit={alEnviar} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="dias"
                  className="dato block text-[10px] text-muted-foreground"
                >
                  Cuántos días tienes
                </label>
                <select id="dias" name="dias" required className={`${campoBase} mt-2`}>
                  {DIAS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="presupuesto"
                  className="dato block text-[10px] text-muted-foreground"
                >
                  Cuánto puedes gastar
                </label>
                <select
                  id="presupuesto"
                  name="presupuesto"
                  required
                  className={`${campoBase} mt-2`}
                >
                  {PRESUPUESTOS.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="salida"
                  className="dato block text-[10px] text-muted-foreground"
                >
                  Desde qué ciudad sales
                </label>
                <input
                  id="salida"
                  name="salida"
                  type="text"
                  required
                  autoComplete="address-level2"
                  placeholder="Madrid"
                  className={`${campoBase} mt-2`}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="dato block text-[10px] text-muted-foreground"
                >
                  Tu correo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  className={`${campoBase} mt-2`}
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" disabled={enviando} className="mt-1 w-full">
                {enviando && <Loader2 className="animate-spin" />}
                {enviando ? "Enviando…" : "Quiero mi itinerario"}
              </Button>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Solo usamos tu correo para mandarte el itinerario. Nada de
                listas de terceros.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
