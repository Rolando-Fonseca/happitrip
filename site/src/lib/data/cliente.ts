import type { Resultado } from "./tipos"

/**
 * Cliente HTTP compartido por todas las fuentes externas.
 *
 * Concentra aquí las cuatro decisiones que no queremos repetir en cada
 * módulo: tiempo máximo de espera, reintento, caché y forma del error.
 * Ninguna función de este archivo lanza excepciones: devuelven `Resultado`.
 */

/** Ninguna fuente externa puede bloquear una compilación más de esto. */
const ESPERA_MAXIMA_MS = 8_000

/** Un solo reintento. Más sería castigar a una fuente que ya va mal. */
const REINTENTOS = 1

/** Los datos de viaje cambian despacio; una hora de caché es de sobra. */
const REVALIDAR_SEGUNDOS = 3_600

/**
 * Wikipedia pide identificar al cliente. Es una norma de su API, no un
 * adorno: sin User-Agent propio pueden limitar o bloquear la petición.
 */
const AGENTE = "HappiTrip/0.1 (proyecto academico; contacto via repositorio)"

export async function pedirJson<T>(
  url: string,
  opciones: { agente?: boolean } = {}
): Promise<Resultado<T>> {
  let ultimoDetalle = "sin intentos"

  for (let intento = 0; intento <= REINTENTOS; intento++) {
    try {
      const respuesta = await fetch(url, {
        signal: AbortSignal.timeout(ESPERA_MAXIMA_MS),
        headers: opciones.agente ? { "User-Agent": AGENTE } : undefined,
        next: { revalidate: REVALIDAR_SEGUNDOS },
      })

      if (!respuesta.ok) {
        ultimoDetalle = `HTTP ${respuesta.status} en ${url}`
        // 4xx no se reintenta: la petición está mal, insistir no la arregla.
        if (respuesta.status >= 400 && respuesta.status < 500) {
          return {
            ok: false,
            motivo: "respuesta-no-valida",
            detalle: ultimoDetalle,
          }
        }
        continue
      }

      const dato = (await respuesta.json()) as T
      return { ok: true, dato }
    } catch (error) {
      const esTiempoAgotado =
        error instanceof Error &&
        (error.name === "TimeoutError" || error.name === "AbortError")

      ultimoDetalle =
        error instanceof Error ? `${error.name}: ${error.message}` : String(error)

      if (esTiempoAgotado && intento === REINTENTOS) {
        return { ok: false, motivo: "tiempo-agotado", detalle: ultimoDetalle }
      }
    }
  }

  return { ok: false, motivo: "error-red", detalle: ultimoDetalle }
}

/**
 * Registra un fallo de fuente externa sin interrumpir la compilación.
 * Se deja como aviso para que quede rastro en el log de build.
 */
export function avisarFallo(fuente: string, motivo: string, detalle: string) {
  console.warn(`[datos] ${fuente} no respondió (${motivo}): ${detalle}`)
}
