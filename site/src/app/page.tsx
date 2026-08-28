import { Hero } from "@/components/site/hero"
import { ComoFunciona } from "@/components/site/como-funciona"
import { RutasSeccion } from "@/components/site/rutas-seccion"
import { Planificador } from "@/components/site/planificador"
import { Testimonios } from "@/components/site/testimonios"
import { Footer } from "@/components/site/footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <ComoFunciona />
      <RutasSeccion />
      <Testimonios />
      <Planificador />
      <Footer />
    </main>
  )
}
