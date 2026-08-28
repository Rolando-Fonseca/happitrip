import { Instagram, Youtube } from "@/components/site/iconos-redes"

import { Logo } from "@/components/site/logo"

// TODO: poner las URLs reales cuando existan las cuentas.
const REDES = [
  { icono: Instagram, nombre: "Instagram", href: "#" },
  { icono: Youtube, nombre: "YouTube", href: "#" },
]

const ANIO = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="dark bg-navy text-crema">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo className="text-2xl" />
            <p className="mt-4 text-sm leading-relaxed text-crema/55">
              Planificamos Eurotrips para quien tiene pocos días, poco
              presupuesto y muchas ganas.
            </p>
          </div>

          <nav aria-label="Pie de página" className="flex gap-16">
            <div>
              <p className="dato text-[9px] text-ambar">Web</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-crema/65">
                <li><a href="#rutas" className="hover:text-ambar">Rutas</a></li>
                <li><a href="#como-funciona" className="hover:text-ambar">Cómo funciona</a></li>
                <li><a href="#planea" className="hover:text-ambar">Planea tu ruta</a></li>
              </ul>
            </div>
            <div>
              <p className="dato text-[9px] text-ambar">Síguenos</p>
              <ul className="mt-4 flex gap-3">
                {REDES.map((r) => (
                  <li key={r.nombre}>
                    <a
                      href={r.href}
                      aria-label={r.nombre}
                      className="grid size-10 place-items-center rounded-full border border-crema/20 text-crema/70 transition-colors hover:border-ambar hover:text-ambar"
                    >
                      <r.icono className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-crema/10 pt-8 text-xs text-crema/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {ANIO} HappiTrip. Todos los derechos reservados.</p>
          <p>Fotografías de Unsplash.</p>
        </div>
      </div>
    </footer>
  )
}
