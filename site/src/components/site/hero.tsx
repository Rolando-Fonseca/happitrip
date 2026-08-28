import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Nav } from "@/components/site/nav"
import { RutasCarrusel } from "@/components/site/rutas-carrusel"
import { Revelar } from "@/components/site/revelar"

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Dos recortes distintos: el vertical tiene gente y funciona en
          móvil; el panorámico deja la mitad izquierda libre para el
          titular en escritorio. */}
      <Image
        src="/img/hero-mobile.jpg"
        alt="Grupo de excursionistas con mochilas caminando hacia los Alpes suizos"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center md:hidden"
      />
      <Image
        src="/img/hero-desktop.jpg"
        alt="Valle alpino de Grindelwald, en Suiza, con praderas verdes y montañas nevadas"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center md:block"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-navy/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/25 to-transparent"
      />

      <Nav />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-end gap-12 px-6 pt-32 pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-16">
        <div className="lg:col-span-6 lg:pb-6">
          <Revelar alCargar retraso={0.1}>
            <p className="dato flex items-center gap-3 text-[11px] text-ambar">
              <span aria-hidden className="h-px w-8 bg-ambar" />
              Eurotrip · verano 2026
            </p>
          </Revelar>

          <Revelar alCargar retraso={0.18}>
            <h1 className="titular mt-5 text-hero text-white uppercase">
              Tu ruta,
              <br />
              resuelta.
            </h1>
          </Revelar>

          <Revelar alCargar retraso={0.26}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
              Dinos cuántos días tienes y cuánto puedes gastar. Te devolvemos el
              Eurotrip entero — ciudades, trenes y camas — con el presupuesto
              cuadrado. Sin hojas de cálculo y sin veinte pestañas abiertas.
            </p>
          </Revelar>

          <Revelar alCargar retraso={0.34}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="ambar" size="lg">
                <a href="#planea">Planea tu ruta</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white">
                <a href="#rutas">Ver las rutas</a>
              </Button>
            </div>
          </Revelar>
        </div>

        <Revelar alCargar retraso={0.42} className="lg:col-span-6">
          <RutasCarrusel />
        </Revelar>
      </div>
    </section>
  )
}
