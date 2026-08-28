import Image from "next/image"
import { CloudRain, Thermometer, Users } from "lucide-react"

import type { CiudadEnriquecida } from "@/lib/data"

/**
 * Ficha de una ciudad con los datos de las tres fuentes externas.
 *
 * Cada bloque se pinta solo si su fuente respondió. Nunca se muestra un
 * error de red al visitante: si falta un dato, ese trozo desaparece y el
 * resto de la ficha sigue siendo útil.
 */
export function FichaCiudad({
  ciudad,
  indice,
}: {
  ciudad: CiudadEnriquecida
  indice: number
}) {
  const { resumen, clima, coordenadas } = ciudad

  return (
    <article className="grid gap-6 border-t border-border py-10 sm:grid-cols-[auto_1fr] sm:gap-8">
      <div className="flex items-start gap-5 sm:flex-col sm:items-center">
        <span className="dato text-xs text-rojo">
          {String(indice + 1).padStart(2, "0")}
        </span>
        {resumen?.imagen && (
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full sm:size-28">
            <Image
              src={resumen.imagen}
              alt={`Vista de ${ciudad.nombre}`}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <h3 className="titular text-2xl text-navy">{ciudad.nombre}</h3>

        {coordenadas && (
          <p className="dato mt-2 text-[10px] text-muted-foreground">
            {coordenadas.pais}
            {coordenadas.poblacion && (
              <>
                {" · "}
                {new Intl.NumberFormat("es-ES").format(coordenadas.poblacion)} hab.
              </>
            )}
          </p>
        )}

        {resumen && (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {resumen.extracto}
          </p>
        )}

        {clima && (
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="flex items-center gap-2 text-sm text-navy">
              <Thermometer aria-hidden className="size-4 text-rojo" strokeWidth={1.5} />
              <strong className="font-semibold">{clima.mediaMaxima}&nbsp;°C</strong>
              <span className="text-muted-foreground">de máxima media</span>
            </span>

            <span className="flex items-center gap-2 text-sm text-navy">
              <CloudRain aria-hidden className="size-4 text-rojo" strokeWidth={1.5} />
              {clima.diasConLluvia === 0 ? (
                <span className="text-muted-foreground">Sin lluvia prevista</span>
              ) : (
                <>
                  <strong className="font-semibold">{clima.diasConLluvia}</strong>
                  <span className="text-muted-foreground">
                    {clima.diasConLluvia === 1 ? "día de lluvia" : "días de lluvia"}
                  </span>
                </>
              )}
            </span>

            {coordenadas?.poblacion && coordenadas.poblacion > 1_000_000 && (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users aria-hidden className="size-4 text-rojo" strokeWidth={1.5} />
                Ciudad grande: reserva con antelación
              </span>
            )}
          </div>
        )}

        {clima && (
          <ol className="mt-5 flex flex-wrap gap-2" aria-label="Previsión por días">
            {clima.dias.map((dia) => (
              <li
                key={dia.fecha}
                className="rounded-lg border border-border bg-white px-3 py-2 text-center"
              >
                <span className="dato block text-[9px] text-muted-foreground">
                  {new Intl.DateTimeFormat("es-ES", { weekday: "short" })
                    .format(new Date(dia.fecha))
                    .replace(".", "")}
                </span>
                <span className="mt-1 block text-sm font-semibold text-navy">
                  {Math.round(dia.tempMaxima)}°
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  {Math.round(dia.tempMinima)}°
                </span>
              </li>
            ))}
          </ol>
        )}

        {resumen?.url && (
          <p className="mt-4">
            <a
              href={resumen.url}
              target="_blank"
              rel="noopener noreferrer"
              className="dato text-[10px] text-rojo underline-offset-4 hover:underline"
            >
              Leer más en Wikipedia
            </a>
          </p>
        )}

        {ciudad.fallos.length > 0 && !resumen && !clima && (
          <p className="mt-4 text-sm text-muted-foreground">
            No hemos podido cargar los datos de esta ciudad ahora mismo.
          </p>
        )}
      </div>
    </article>
  )
}
