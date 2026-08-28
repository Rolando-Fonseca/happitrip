# 02 · Mapa de componentes

> Sesión 1 · HappiTrip Landing (v1) · 2026-08-28

## 1. Inventario

Catorce componentes, ninguno de más de 180 líneas. Doce viven en
`site/src/components/` (once en `site/`, uno en `ui/`); `RootLayout` y `Home` están en
`site/src/app/`, porque el App Router los trata como puntos de entrada y no como piezas
reutilizables.

| Componente | Archivo | Tipo | Estado | Responsabilidad |
|---|---|---|---|---|
| `RootLayout` | `app/layout.tsx` | Servidor | — | Fuentes, metadatos SEO, `lang`, fallback `<noscript>` |
| `Home` | `app/page.tsx` | Servidor | — | Compone las seis secciones. Sin lógica |
| `Hero` | `site/hero.tsx` | Servidor | — | Foto de fondo, titular, CTA. Orquesta `Nav` y `RutasCarrusel` |
| `Nav` | `site/nav.tsx` | **Cliente** | `useState` (menú) | Navegación y menú hamburguesa |
| `Logo` | `site/logo.tsx` | Servidor | — | Wordmark tipográfico |
| `RutasCarrusel` | `site/rutas-carrusel.tsx` | **Cliente** | `useState` ×3 + Embla | Carrusel del hero, flechas y contador |
| `ComoFunciona` | `site/como-funciona.tsx` | Servidor | — | Los tres pasos del proceso |
| `RutasSeccion` | `site/rutas-seccion.tsx` | Servidor | — | Rejilla de las cuatro rutas |
| `Testimonios` | `site/testimonios.tsx` | Servidor | — | Opiniones, marcadas como ejemplo |
| `Planificador` | `site/planificador.tsx` | **Cliente** | `useState` ×3 | Formulario y envío |
| `Footer` | `site/footer.tsx` | Servidor | — | Enlaces, redes, aviso legal |
| `Revelar` | `site/revelar.tsx` | **Cliente** | — | Animación de entrada reutilizable |
| `Button` | `ui/button.tsx` | Servidor | — | Botón con variantes (`cva`) |
| `Instagram` / `Youtube` | `site/iconos-redes.tsx` | Servidor | — | SVG de marca propios |

## 2. Equivalencia con el sistema legacy del enunciado

El enunciado original pedía mapear `App`, `Home`, `Detail`, `Navbar`, `Grid` y `MovieCard`
sobre un clon de Netflix. La correspondencia con HappiTrip es casi uno a uno:

| Verflix (React 18 legacy) | HappiTrip (React 19) | Diferencia relevante |
|---|---|---|
| `App` | `RootLayout` + `Home` | Se parte en dos: el layout persiste entre rutas, la página no |
| `Home` | `page.tsx` | En Verflix contenía estado y peticiones de red; aquí solo compone |
| `Detail` | **No existe** | Es el hueco que abre la v2: `/rutas/[slug]` |
| `Navbar` | `Nav` | Equivalente directo. Único con estado de interfaz |
| `Grid` | `RutasSeccion` / `RutasCarrusel` | Se desdobla en dos: rejilla estática y carrusel |
| `MovieCard` | Tarjeta de ruta (en línea) | No se extrajo a componente: se usa en dos sitios con formas distintas |

**La ausencia de `Detail` es el hallazgo más útil de este mapeo.** Marca exactamente dónde
empieza el trabajo de la v2 y explica por qué hoy no hace falta enrutado dinámico.

## 3. Patrones legacy y cómo los evita esta arquitectura

Los tres problemas que el enunciado pedía identificar en un sistema legacy —componentes de
clase, `setState` y prop drilling— no aparecen aquí. Merece la pena documentar **por qué**,
porque esa es la justificación de la arquitectura elegida.

| Patrón legacy (React 18) | Qué provocaba | Qué se hace en HappiTrip |
|---|---|---|
| Componentes de clase | Ciclo de vida repartido entre `componentDidMount`, `componentDidUpdate` y `componentWillUnmount`; lógica difícil de reutilizar | Funciones. El único ciclo de vida real está en `RutasCarrusel`: un `useEffect` que suscribe y limpia los eventos de Embla |
| `setState` con objeto y callback | Actualizaciones agrupadas de forma implícita, condiciones de carrera al depender del estado anterior | `useState` con valores primitivos y actualización funcional: `setAbierto((v) => !v)` |
| Prop drilling | Datos atravesando cinco niveles para llegar a una hoja; cualquier cambio de forma obliga a tocar todos los intermedios | Ningún dato baja más de un nivel |
| Peticiones dentro del componente | Cascadas de llamadas, estados de carga por todas partes, difícil de cachear | No hay peticiones: los datos se resuelven en compilación |

**Matiz honesto.** `RutasCarrusel` y `RutasSeccion` **importan** `RUTAS` directamente en
lugar de recibirla por props. Hoy es cómodo porque la fuente es un array estático. Cuando en
la v2 los datos vengan de una API, esa comodidad se convierte en acoplamiento: el componente
sabría de dónde salen sus datos y no se podría reutilizar con otra fuente. **La v2 debe
invertir esto** y pasar los datos por props desde el componente de servidor.

Es decir: esta arquitectura evita el prop drilling, pero lo hace a costa de un acoplamiento
que todavía no duele. Conviene registrarlo antes de que duela.

## 4. Cohesión y reutilización

- **`Revelar` es el único componente genuinamente reutilizado** — cinco veces en el hero y
  una en cada sección. Encapsula la animación de entrada para que ningún otro componente
  tenga que importar `motion`. Aplicación directa de DRY.
- **`Button` centraliza cinco variantes** mediante `class-variance-authority`. Añadir el
  estado `:active` a todos los botones del sitio fue un cambio de una línea.
- **La tarjeta de ruta está duplicada** en `RutasCarrusel` y `RutasSeccion`, con formas
  distintas: 3:4 con datos mínimos frente a 4:5 con resumen y ciudades. Es duplicación
  consciente — extraer un componente con seis props booleanas para cubrir ambos casos sería
  peor que mantener dos versiones legibles. **Queda registrado como deuda a revisar** si
  aparece una tercera variante.
