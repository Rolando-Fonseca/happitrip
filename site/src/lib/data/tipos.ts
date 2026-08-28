/**
 * Contratos de la capa de datos.
 *
 * Regla de diseño: todo campo que venga de una API externa es opcional.
 * Una fuente de terceros puede fallar, cambiar o devolver un hueco, y la
 * interfaz tiene que seguir renderizando. Lo que es obligatorio es solo
 * aquello que controlamos nosotros.
 */

/** Resultado explícito en lugar de excepciones. Obliga a tratar el fallo. */
export type Resultado<T> =
  | { ok: true; dato: T }
  | { ok: false; motivo: MotivoFallo; detalle: string }

export type MotivoFallo =
  | "tiempo-agotado"
  | "respuesta-no-valida"
  | "sin-resultados"
  | "error-red"

export type Coordenadas = {
  latitud: number
  longitud: number
  /** Código ISO alpha-2 devuelto por la fuente, p. ej. "CZ". */
  codigoPais: string
  /** Nombre del país en español, tal como lo da la fuente. */
  pais: string
  zonaHoraria: string
  poblacion?: number
}

export type DiaDeClima = {
  /** Fecha ISO, p. ej. "2026-08-28". */
  fecha: string
  tempMaxima: number
  tempMinima: number
  /** Precipitación acumulada en milímetros. */
  lluvia: number
}

export type Clima = {
  dias: DiaDeClima[]
  /** Media de las máximas del periodo, redondeada. */
  mediaMaxima: number
  /** Días del periodo con precipitación apreciable (más de 1 mm). */
  diasConLluvia: number
}

export type ResumenEnciclopedico = {
  titulo: string
  extracto: string
  imagen?: string
  url?: string
}

/** Una ciudad tal como la definimos nosotros, antes de enriquecer. */
export type Ciudad = {
  /** Lo que se muestra en pantalla. */
  nombre: string
  /**
   * Nombre con el que se geocodifica, cuando el corto es ambiguo.
   * "Santiago" devuelve Santiago de Chile; "Santiago de Compostela", no.
   */
  buscar?: string
  /**
   * Título exacto del artículo en la Wikipedia en español, cuando difiere
   * del nombre que mostramos. Evita depender del buscador.
   */
  wiki?: string
}

/**
 * Una ciudad después de consultar las fuentes externas. Los tres campos
 * enriquecidos son opcionales a propósito: la ficha se pinta igual aunque
 * las tres fuentes hayan fallado.
 */
export type CiudadEnriquecida = Ciudad & {
  coordenadas?: Coordenadas
  clima?: Clima
  resumen?: ResumenEnciclopedico
  /** Fuentes que no respondieron. Se muestra como aviso, no como error. */
  fallos: MotivoFallo[]
}
