import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Hay un pnpm-workspace.yaml en el directorio de usuario que Turbopack
  // toma por raíz del workspace y entonces no resuelve el paquete `next`.
  // Fijamos la raíz a esta carpeta para que la detección no suba de nivel.
  devIndicators: false,

  images: {
    remotePatterns: [
      // Miniaturas de Wikipedia. Sirve desde varios subdominios
      // (upload., thumb., …), así que el patrón los cubre todos.
      // La lista blanca real está en lib/data/fuentes.ts.
      { protocol: "https", hostname: "**.wikimedia.org" },
    ],
  },

  turbopack: {
    root: path.join(__dirname),
  },
}

export default nextConfig
