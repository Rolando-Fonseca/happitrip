/**
 * Rutas de ejemplo. Los precios son estimaciones de viaje low cost
 * (pase de tren + hostal + comida, sin vuelos internacionales).
 * Sustituir por itinerarios reales antes de lanzar.
 */
export type Ruta = {
  slug: string
  nombre: string
  pais: string
  ciudades: string[]
  dias: number
  precioDesde: number
  resumen: string
  imagen: string
  alt: string
}

export const RUTAS: Ruta[] = [
  {
    slug: "clasica",
    nombre: "La Clásica",
    pais: "Francia · Países Bajos · Alemania · Chequia",
    ciudades: ["París", "Ámsterdam", "Berlín", "Praga"],
    dias: 14,
    precioDesde: 820,
    resumen:
      "Las cuatro capitales que todo el mundo quiere ver, encadenadas por tren nocturno para no perder ni un día.",
    imagen: "/img/ruta-clasica.jpg",
    alt: "Calle de París con edificios haussmanianos vista desde una ventana abierta",
  },
  {
    slug: "mediterranea",
    nombre: "La Mediterránea",
    pais: "España · Francia · Italia",
    ciudades: ["Barcelona", "Niza", "Florencia", "Roma"],
    dias: 12,
    precioDesde: 760,
    resumen:
      "Costa, arte y cenas largas. La ruta más barata en comida y la que menos horas de tren acumula.",
    imagen: "/img/ruta-mediterranea.jpg",
    alt: "Mesas con manteles de cuadros en una calle adoquinada de Roma",
  },
  {
    slug: "alpina",
    nombre: "La Alpina",
    pais: "Alemania · Austria",
    ciudades: ["Múnich", "Salzburgo", "Hallstatt", "Innsbruck"],
    dias: 10,
    precioDesde: 690,
    resumen:
      "Montaña, lagos y pueblos pequeños. Distancias cortas, así que sobra tiempo para caminar.",
    imagen: "/img/ruta-alpina.jpg",
    alt: "El pueblo de Hallstatt junto al lago, con los Alpes austríacos al fondo",
  },
  {
    slug: "atlantica",
    nombre: "La Atlántica",
    pais: "Portugal · España",
    ciudades: ["Lisboa", "Oporto", "Santiago", "San Sebastián"],
    dias: 11,
    precioDesde: 640,
    resumen:
      "La opción más económica de las cuatro. Océano, vino y las mejores raciones por menos de diez euros.",
    imagen: "/img/ruta-atlantica.jpg",
    alt: "Tranvía amarillo subiendo una calle estrecha de Lisboa",
  },
]
