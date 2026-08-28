import { pedirJson } from "./cliente"
import type {
  Clima,
  Coordenadas,
  DiaDeClima,
  Resultado,
  ResumenEnciclopedico,
} from "./tipos"

/**
 * Las tres fuentes externas del proyecto. Cada una traduce la respuesta
 * cruda a nuestro contrato: fuera de este archivo nadie conoce la forma
 * que devuelve un tercero.
 *
 * Fuentes descartadas en la evaluación previa:
 *   - REST Countries v3.1 — la propia API responde que está deprecada.
 *   - Nominatim (OSM) — exige un máximo de una petición por segundo, que
 *     complica la compilación sin aportar nada que Open-Meteo no dé ya.
 */

// ---------------------------------------------------------------------------
// 1 · Geocodificación — Open-Meteo. Sin clave. Licencia CC-BY 4.0.
// ---------------------------------------------------------------------------

type RespuestaGeocodificacion = {
  results?: Array<{
    latitude: number
    longitude: number
    country_code: string
    country: string
    timezone: string
    population?: number
  }>
}

export async function buscarCoordenadas(
  ciudad: string
): Promise<Resultado<Coordenadas>> {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search" +
    `?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`

  const respuesta = await pedirJson<RespuestaGeocodificacion>(url)
  if (!respuesta.ok) return respuesta

  const primero = respuesta.dato.results?.[0]
  if (!primero) {
    return {
      ok: false,
      motivo: "sin-resultados",
      detalle: `La geocodificación no encontró "${ciudad}"`,
    }
  }

  return {
    ok: true,
    dato: {
      latitud: primero.latitude,
      longitud: primero.longitude,
      codigoPais: primero.country_code,
      pais: primero.country,
      zonaHoraria: primero.timezone,
      poblacion: primero.population,
    },
  }
}

// ---------------------------------------------------------------------------
// 2 · Clima — Open-Meteo. Sin clave. Licencia CC-BY 4.0.
// ---------------------------------------------------------------------------

type RespuestaClima = {
  daily?: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_sum: number[]
  }
}

/** Umbral en milímetros a partir del cual un día cuenta como lluvioso. */
const LLUVIA_APRECIABLE_MM = 1

export async function buscarClima(
  latitud: number,
  longitud: number,
  dias = 7
): Promise<Resultado<Clima>> {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitud}&longitude=${longitud}` +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum" +
    `&forecast_days=${dias}&timezone=auto`

  const respuesta = await pedirJson<RespuestaClima>(url)
  if (!respuesta.ok) return respuesta

  const diario = respuesta.dato.daily
  if (!diario?.time?.length) {
    return {
      ok: false,
      motivo: "sin-resultados",
      detalle: "La respuesta de clima no traía serie diaria",
    }
  }

  const serie: DiaDeClima[] = diario.time.map((fecha, i) => ({
    fecha,
    tempMaxima: diario.temperature_2m_max[i],
    tempMinima: diario.temperature_2m_min[i],
    lluvia: diario.precipitation_sum[i] ?? 0,
  }))

  const mediaMaxima = Math.round(
    serie.reduce((suma, d) => suma + d.tempMaxima, 0) / serie.length
  )

  return {
    ok: true,
    dato: {
      dias: serie,
      mediaMaxima,
      diasConLluvia: serie.filter((d) => d.lluvia > LLUVIA_APRECIABLE_MM).length,
    },
  }
}

// ---------------------------------------------------------------------------
// 3 · Resumen enciclopédico — Wikipedia en español. Sin clave. CC BY-SA.
// ---------------------------------------------------------------------------

/**
 * Wikipedia sirve las miniaturas desde varios subdominios y puede cambiarlos
 * sin avisar. Como `next/image` lanza si recibe un host no autorizado, se
 * valida aquí: una imagen de origen inesperado se descarta en silencio y la
 * ficha se pinta sin ella, en lugar de tumbar la página entera.
 */
function imagenDeConfianza(url: string | undefined): string | undefined {
  if (!url) return undefined
  try {
    const { protocol, hostname } = new URL(url)
    const permitida =
      protocol === "https:" &&
      (hostname === "wikimedia.org" || hostname.endsWith(".wikimedia.org"))
    return permitida ? url : undefined
  } catch {
    return undefined
  }
}

type RespuestaWikipedia = {
  title?: string
  extract?: string
  thumbnail?: { source?: string }
  content_urls?: { desktop?: { page?: string } }
}

export async function buscarResumen(
  titulo: string
): Promise<Resultado<ResumenEnciclopedico>> {
  const url =
    "https://es.wikipedia.org/api/rest_v1/page/summary/" +
    encodeURIComponent(titulo)

  const respuesta = await pedirJson<RespuestaWikipedia>(url, { agente: true })
  if (!respuesta.ok) return respuesta

  const { title, extract, thumbnail, content_urls } = respuesta.dato
  if (!extract) {
    return {
      ok: false,
      motivo: "sin-resultados",
      detalle: `Sin extracto para "${titulo}"`,
    }
  }

  return {
    ok: true,
    dato: {
      titulo: title ?? titulo,
      extracto: extract,
      imagen: imagenDeConfianza(thumbnail?.source),
      url: content_urls?.desktop?.page,
    },
  }
}
