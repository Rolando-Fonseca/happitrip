import type { Metadata, Viewport } from "next"
import {
  Archivo,
  Manrope,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google"
import "./globals.css"

/** Titulares: grotesca ancha y pesada, aguanta bien en mayúsculas grandes. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["600", "700", "800"],
  display: "swap",
})

/** Cuerpo: humanista, abierta, legible en párrafos largos. */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

/** Datos duros: días, precios, etiquetas. */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["500"],
  display: "swap",
})

/** Solo para citas de testimonios. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic"],
  weight: ["400"],
  display: "swap",
})

// TODO: sustituir por el dominio real cuando se contrate.
const SITIO = "https://happitrip.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: "HappiTrip — Tu Eurotrip planificado en 24 horas",
    template: "%s · HappiTrip",
  },
  description:
    "Dinos cuántos días tienes y cuánto puedes gastar. Te devolvemos un Eurotrip completo: ciudades, trenes y camas, con el presupuesto cuadrado.",
  keywords: [
    "eurotrip",
    "interrail",
    "planificador de viajes",
    "viajar por Europa barato",
    "itinerario Europa",
    "mochilero Europa",
  ],
  authors: [{ name: "HappiTrip" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITIO,
    siteName: "HappiTrip",
    title: "HappiTrip — Tu Eurotrip planificado en 24 horas",
    description:
      "Cuántos días tienes y cuánto puedes gastar. Nosotros ponemos las ciudades, los trenes y las camas.",
    images: [
      {
        url: "/img/hero-desktop.jpg",
        width: 2560,
        height: 1440,
        alt: "Valle alpino en Suiza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HappiTrip — Tu Eurotrip planificado en 24 horas",
    description:
      "Cuántos días tienes y cuánto puedes gastar. Nosotros ponemos el resto.",
    images: ["/img/hero-desktop.jpg"],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#14213d",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        {/* Las animaciones de entrada arrancan en opacidad cero. Si el
            JavaScript no llega a ejecutarse, esto fuerza el contenido a
            visible: el texto siempre se lee. */}
        <noscript>
          <style>{`[style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${archivo.variable} ${manrope.variable} ${jetbrains.variable} ${playfair.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
