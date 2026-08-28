import { avisarFallo } from "./cliente"
import { buscarClima, buscarCoordenadas, buscarResumen } from "./fuentes"
import type { Ciudad, CiudadEnriquecida, MotivoFallo } from "./tipos"

export * from "./tipos"

/**
 * Composición de las fuentes externas.
 *
 * Esta es la única función que el resto de la aplicación necesita conocer.
 * Garantiza dos cosas:
 *   1. Nunca lanza. Devuelve siempre una ciudad pintable.
 *   2. Deja constancia de qué fuente falló, para poder avisar en pantalla
 *      en lugar de mostrar un hueco sin explicación.
 */
export async function enriquecerCiudad(
  ciudad: Ciudad
): Promise<CiudadEnriquecida> {
  const fallos: MotivoFallo[] = []
  const resultado: CiudadEnriquecida = { ...ciudad, fallos }

  // Wikipedia no depende de las coordenadas, así que va en paralelo con la
  // geocodificación. El clima sí depende, y por eso espera.
  const [geo, resumen] = await Promise.all([
    buscarCoordenadas(ciudad.buscar ?? ciudad.nombre),
    buscarResumen(ciudad.wiki ?? ciudad.nombre),
  ])

  if (geo.ok) {
    resultado.coordenadas = geo.dato
  } else {
    fallos.push(geo.motivo)
    avisarFallo(`geocodificación:${ciudad.nombre}`, geo.motivo, geo.detalle)
  }

  if (resumen.ok) {
    resultado.resumen = resumen.dato
  } else {
    fallos.push(resumen.motivo)
    avisarFallo(`wikipedia:${ciudad.nombre}`, resumen.motivo, resumen.detalle)
  }

  // Sin coordenadas no hay clima que pedir. No es un fallo del clima:
  // es una consecuencia del fallo anterior, y no se cuenta dos veces.
  if (resultado.coordenadas) {
    const clima = await buscarClima(
      resultado.coordenadas.latitud,
      resultado.coordenadas.longitud
    )
    if (clima.ok) {
      resultado.clima = clima.dato
    } else {
      fallos.push(clima.motivo)
      avisarFallo(`clima:${ciudad.nombre}`, clima.motivo, clima.detalle)
    }
  }

  return resultado
}

/** Enriquece todas las ciudades de una ruta. Una ruta, una tanda. */
export async function enriquecerCiudades(
  ciudades: Ciudad[]
): Promise<CiudadEnriquecida[]> {
  return Promise.all(ciudades.map(enriquecerCiudad))
}

/**
 * Media de las temperaturas máximas de todas las ciudades que sí
 * devolvieron clima. Devuelve null si ninguna lo hizo, para que la
 * interfaz pueda omitir el dato en lugar de enseñar un cero engañoso.
 */
export function temperaturaMediaDeRuta(
  ciudades: CiudadEnriquecida[]
): number | null {
  const conClima = ciudades.filter((c) => c.clima)
  if (conClima.length === 0) return null

  return Math.round(
    conClima.reduce((suma, c) => suma + c.clima!.mediaMaxima, 0) /
      conClima.length
  )
}
