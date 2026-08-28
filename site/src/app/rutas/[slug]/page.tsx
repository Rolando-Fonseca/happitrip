import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FichaCiudad } from "@/components/site/ficha-ciudad"
import { Footer } from "@/components/site/footer"
import { Logo } from "@/components/site/logo"
import { enriquecerCiudades, temperaturaMediaDeRuta } from "@/lib/data"
import { RUTAS, buscarRuta, nombresDeCiudades } from "@/lib/rutas"

/** Prerenderiza las cuatro rutas en compilación. El catálogo es acotado. */
export function generateStaticParams() {
  return RUTAS.map((ruta) => ({ slug: ruta.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const ruta = buscarRuta(slug)
  if (!ruta) return { title: "Ruta no encontrada" }

  return {
    title: `${ruta.nombre} — ${ruta.dias} días por Europa`,
    description: `${ruta.resumen} ${nombresDeCiudades(ruta).join(", ")}. Desde ${ruta.precioDesde} €.`,
    openGraph: {
      title: `${ruta.nombre} · HappiTrip`,
      description: ruta.resumen,
      images: [{ url: ruta.imagen, alt: ruta.alt }],
    },
  }
}

export default async function PaginaRuta({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ruta = buscarRuta(slug)
  if (!ruta) notFound()

  // Aquí se consultan las tres fuentes externas. Ocurre en compilación,
  // así que el visitante recibe HTML ya resuelto.
  const ciudades = await enriquecerCiudades(ruta.ciudades)
  const temperaturaMedia = temperaturaMediaDeRuta(ciudades)
  const fuentesCaidas = ciudades.filter((c) => c.fallos.length > 0).length

  return (
    <main>
      <section className="relative flex min-h-[70svh] flex-col overflow-hidden">
        <Image
          src={ruta.imagen}
          alt={ruta.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/20"
        />

        <header className="relative z-10">
          <div className="h-1 bg-ambar" />
          <nav
            aria-label="Principal"
            className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-white"
          >
            <Link href="/" aria-label="HappiTrip, inicio">
              <Logo />
            </Link>
            <Button asChild variant="ambar" size="sm">
              <Link href="/#planea">Planea tu ruta</Link>
            </Button>
          </nav>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-14">
          <Link
            href="/#rutas"
            className="dato flex w-fit items-center gap-2 text-[11px] text-ambar transition-colors hover:text-white"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            Todas las rutas
          </Link>

          <h1 className="titular mt-5 text-hero text-white uppercase">
            {ruta.nombre}
          </h1>

          <p className="dato mt-5 text-[11px] text-ambar">
            {ruta.dias} días · desde {ruta.precioDesde} € · {ruta.ciudades.length} ciudades
            {temperaturaMedia !== null && <> · {temperaturaMedia} °C de media</>}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
            {ruta.resumen}
          </p>
        </div>
      </section>

      <section className="bg-crema py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="dato flex items-center gap-3 text-[11px] text-rojo">
            <span aria-hidden className="h-px w-8 bg-rojo" />
            El itinerario, parada a parada
          </p>

          <h2 className="titular mt-5 max-w-2xl text-h1 text-navy">
            {nombresDeCiudades(ruta).join(" → ")}
          </h2>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            La previsión del tiempo es de los próximos siete días y se actualiza cada
            hora. Sirve para hacerte una idea del clima, no para decidir qué meter en la
            mochila dentro de tres meses.
          </p>

          <div className="mt-12">
            {ciudades.map((ciudad, i) => (
              <FichaCiudad key={ciudad.nombre} ciudad={ciudad} indice={i} />
            ))}
          </div>

          {fuentesCaidas > 0 && (
            <p className="mt-8 text-xs text-muted-foreground">
              Algunos datos externos no estaban disponibles al generar esta página.
              Vuelve a intentarlo más tarde.
            </p>
          )}

          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
            Datos meteorológicos y de geolocalización de{" "}
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Open-Meteo
            </a>{" "}
            (CC BY 4.0). Descripciones de{" "}
            <a
              href="https://es.wikipedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Wikipedia
            </a>{" "}
            (CC BY-SA). Precios estimados para viaje low cost, sin vuelos.
          </p>
        </div>
      </section>

      <section className="dark bg-navy py-20 text-crema sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="titular text-h2 uppercase">
              ¿Te encaja esta ruta?
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-crema/65">
              La adaptamos a tus días y a tu presupuesto. Dinos cuánto tienes de cada
              cosa y te la devolvemos cuadrada en 24 horas.
            </p>
          </div>
          <Button asChild variant="ambar" size="lg">
            <Link href="/#planea">Planea tu ruta</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
