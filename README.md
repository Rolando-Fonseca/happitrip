# HappiTrip

**Planificador de itinerarios de Eurotrip.** Dinos cuántos días tienes y cuánto puedes
gastar, y te devolvemos la ruta entera: ciudades, trenes y camas, con el presupuesto
cuadrado.

Dirigido a viajeros jóvenes con presupuesto ajustado y pocos días libres. En
prelanzamiento: el planificador automático todavía no existe y los primeros itinerarios se
hacen a mano.

**Demo:** https://site-eight-psi-94.vercel.app

> Este repositorio tiene doble propósito. Es un producto real en desarrollo y, a la vez, el
> proyecto troncal del portafolio de la certificación **Ingeniería de Contexto con sistemas
> de IA**. Los artefactos académicos están en [`docs/`](docs/README.md).

## Despliegue

Alojado en Vercel, conectado a este repositorio: cada `push` a `main` publica una versión
nueva. El *Root Directory* del proyecto en Vercel es **`site`**, no la raíz — la aplicación
no está en el primer nivel del repositorio y sin ese ajuste la compilación falla.

## Arranque rápido

Requiere Node.js 18 o superior.

```bash
npm --prefix site install
npm run dev
```

La aplicación queda en **http://localhost:3100**.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en el puerto 3100 |
| `npm run build` | Compilación de producción |
| `npm start` | Sirve la compilación en el puerto 3100 |
| `npm run lint` | Comprobación de estilo |

> **Usa npm, nunca pnpm.** Hay un `pnpm-workspace.yaml` en el directorio de usuario que
> hace que pnpm instale las dependencias fuera del proyecto; Turbopack entonces no las
> encuentra y el build falla con un mensaje engañoso. El `package-lock.json` está
> versionado por ese motivo.

## Qué hay construido

- **Landing** con hero fotográfico, carrusel de rutas, formulario de captación y las
  secciones de contenido.
- **Página de detalle por ruta** (`/rutas/[slug]`) que enriquece cada ciudad con datos
  reales de tres fuentes externas.
- **Capa de datos** resiliente: si una fuente falla, ese bloque desaparece y el resto de la
  página sigue siendo útil. El visitante nunca ve un error de red.

### Fuentes de datos

Ninguna requiere clave ni cuenta.

| Fuente | Aporta | Licencia |
|---|---|---|
| [Open-Meteo Geocoding](https://open-meteo.com) | Coordenadas, país, población, zona horaria | CC BY 4.0 |
| [Open-Meteo Forecast](https://open-meteo.com) | Temperaturas y lluvia a siete días | CC BY 4.0 |
| [Wikipedia REST (es)](https://es.wikipedia.org) | Resumen e imagen de cada ciudad | CC BY-SA |

Las fotografías de rutas son de [Unsplash](https://unsplash.com). Créditos en
[`site/public/img/CREDITS.md`](site/public/img/CREDITS.md).

## Estructura

```
.
├── site/                 La aplicación Next.js
│   ├── src/app/          Rutas: portada y /rutas/[slug]
│   ├── src/components/   Componentes de presentación
│   ├── src/lib/data/     Capa de acceso a fuentes externas
│   └── public/img/       Fotografías y sus créditos
├── docs/                 Artefactos académicos
│   └── kit/              Documentación del kit de construcción original
└── .claude/skills/       Skills del kit
```

## Tecnología

Next.js 16 con App Router, React 19, TypeScript y Tailwind CSS 4. Once dependencias en
total: la capa de datos no añadió ninguna, porque `fetch`, `AbortSignal` y `URL` son
nativos.

Casi todos los componentes son de servidor y no envían JavaScript al navegador: solo
cuatro necesitan interactividad (navegación, carrusel, animación de entrada y formulario).

## Documentación

| Artefacto | Contenido |
|---|---|
| [Arquitectura](docs/S1-01-arquitectura.md) | Jerarquía, frontera servidor/cliente, flujo de datos |
| [Mapa de componentes](docs/S1-02-mapa-componentes.md) | Inventario y patrones legacy evitados |
| [Dependencias](docs/S1-03-dependencias.md) | Propósito de cada una y tres incidentes reales |
| [Plan de migración](docs/S1-04-plan-migracion.md) | v0 legacy → v1 → v2 |
| [Normas de trabajo](docs/S1-05-normas-trabajo.md) | Ramas, commits, semver, verificación |
| [Issues](docs/S1-06-issues.md) | Registro con criterios de aceptación |
| [Prompts base](docs/S1-07-prompts-sesion2.md) | Efectivos frente a confusos |
| [Capa de datos](docs/S2-01-capa-de-datos.md) | Evaluación de fuentes, contrato, resiliencia |

## Pendiente antes de publicar

Todo lo marcado con `TODO` en `site/src/`, detallado en el [issue #4](docs/S1-06-issues.md):

- Correo de contacto real: hoy es `hola@happitrip.com`, inventado.
- Identificador de Formspree. Sin él, el formulario abre el cliente de correo.
- Dominio real en los metadatos.
- Enlaces de redes sociales.
- Testimonios reales. Los actuales están marcados como contenido de ejemplo.
- Itinerarios y precios reales. Los cuatro actuales son estimaciones.

## Créditos y licencia

La landing se construyó partiendo de
[Claude Web Builder](https://github.com/Hainrixz/claude-webkit) de Enrique Rocha
(Tododeia), distribuido bajo licencia MIT. El archivo [`LICENSE`](LICENSE) conserva su
aviso de copyright, que cubre el kit incluido en `.claude/skills/` y `docs/kit/`.

El código de HappiTrip no tiene licencia asignada todavía. Sin una licencia explícita se
consideran «todos los derechos reservados», que es probablemente lo que quieres para un
producto comercial — pero conviene decidirlo a conciencia y dejarlo escrito.
