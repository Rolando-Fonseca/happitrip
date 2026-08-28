# 03 · Análisis de dependencias

> Sesión 1 · HappiTrip Landing (v1) · 2026-08-28
> Fuente: `site/package.json` y recuento de importaciones reales sobre `site/src/`

## 1. Inventario y propósito

| Paquete | Versión | Para qué está | Archivos que lo usan |
|---|---|---|---|
| `next` | 16.3.3 | Framework: enrutado, compilación estática, optimización de imágenes y fuentes | Todo el proyecto |
| `react` / `react-dom` | 19.2.8 | Biblioteca de interfaz | Todo el proyecto |
| `motion` | 13.1.1 | Animaciones de entrada y revelado al hacer scroll | 1 · `revelar.tsx` |
| `embla-carousel-react` | 8.6.0 | Motor del carrusel del hero | 1 · `rutas-carrusel.tsx` |
| `lucide-react` | 1.34.0 | Iconografía | 5 |
| `class-variance-authority` | 0.7.1 | Variantes tipadas del botón | 1 · `ui/button.tsx` |
| `clsx` | 2.1.1 | Composición condicional de clases | 1 · `lib/utils.ts` |
| `tailwind-merge` | 3.6.0 | Resuelve conflictos entre utilidades de Tailwind | 1 · `lib/utils.ts` |
| `tw-animate-css` | 1.4.0 | Utilidades de animación en CSS | 1 · `globals.css` |
| `@radix-ui/react-slot` | 1.3.3 | Habilita `asChild` en `Button`: renderiza un `<a>` con estilos de botón | 1 · `ui/button.tsx` |

## 2. Hallazgo: cuatro dependencias huérfanas

El recuento de importaciones sobre `site/src/` devuelve **cero referencias** para:

| Paquete | Referencias en el código |
|---|---|
| `@radix-ui/react-dialog` | 0 |
| `@radix-ui/react-label` | 0 |
| `@radix-ui/react-navigation-menu` | 0 |
| `@radix-ui/react-separator` | 0 |

**Causa.** Se instalaron anticipando que el CLI de shadcn generaría los componentes de
menú, diálogo y formulario. El CLI se quedó bloqueado esperando un prompt interactivo, así
que los componentes se escribieron a mano con HTML semántico: el menú móvil es un `<div>`
con el atributo `hidden` y las etiquetas del formulario son `<label>` nativas. Las
dependencias quedaron instaladas sin llegar a usarse.

**Impacto real.** No engordan lo que se envía al navegador, porque los empaquetadores
modernos descartan lo que nadie importa. Sí ensucian la superficie de mantenimiento:
aparecen en auditorías de seguridad, en avisos de actualización y en el árbol de
dependencias, y obligan a decidir sobre paquetes que no aportan nada.

**Acción.** Desinstalar. Registrado como issue de Dependencias.

```bash
npm uninstall @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-navigation-menu @radix-ui/react-separator
```

## 3. Control de versiones de dependencias

El proyecto usa **npm con `package-lock.json` versionado**. No es preferencia estética: es
la corrección de un fallo real.

`create-next-app` detectó un `pnpm-workspace.yaml` situado en el directorio de usuario
(`C:\Users\liand`), muy por encima del proyecto, y decidió usar pnpm. Las dependencias
acabaron en el almacén global de pnpm y `site/node_modules/next` quedó como un enlace
simbólico **fuera de la raíz del proyecto**. Turbopack se niega a compilar archivos fuera
de la raíz del workspace, y el build falló con un mensaje engañoso —«Could not find the
Next.js package»— pese a que el paquete existía y era accesible.

Diagnóstico correcto: el problema no era la ausencia del paquete, sino su ubicación.

**Normas derivadas:**

1. Fijar el gestor de paquetes por proyecto y versionar su lockfile.
2. No ejecutar `pnpm install` en este repositorio.
3. `turbopack.root` está fijado explícitamente en `next.config.ts`, con un comentario que
   explica el motivo, para que la detección de raíz no suba de nivel.

## 4. Segundo incidente: integridad de la instalación

Una instalación interrumpida a mitad dejó **844 archivos de `lucide-react` con bytes
nulos**. El síntoma fue un build con 844 errores de sintaxis dentro de `node_modules`, no
en el código propio. Se confirmó escaneando el árbol en busca de bytes nulos: tras
reinstalar, 0 archivos corruptos sobre 18.454 revisados.

**Norma derivada.** Un error de compilación que apunta a `node_modules` y no al código
propio se trata primero como problema de integridad de la instalación, no como error de
programación. Reinstalar antes de depurar.

## 5. Ruptura de API por cambio de versión mayor

`lucide-react` v1 **retiró los iconos de marcas comerciales**. `Instagram` y `Youtube`
dejaron de existir como exportaciones y el build falló con «Export Instagram doesn't exist
in target module».

**Resolución.** Se sustituyeron por SVG propios en `site/src/components/site/iconos-redes.tsx`,
con el mismo trazo que el resto —24 px, grosor 2, sin relleno— para que no desentonen.

**Lectura en clave de semver.** Es exactamente el tipo de cambio que obliga a subir versión
mayor: se elimina una exportación pública. Un rango `^` no habría traído este cambio, pero
una instalación nueva sin lockfile sí. Refuerza el punto 1 del apartado anterior.

## 6. Dependencias que se evitaron a propósito

| Alternativa habitual | Por qué no se instaló |
|---|---|
| `framer-motion` | Es el nombre antiguo del mismo paquete que `motion`. Instalar ambos duplicaría la biblioteca en el paquete final |
| Gestor de estado (Redux, Zustand) | No hay estado compartido entre secciones |
| Cliente HTTP (axios, swr) | No hay peticiones de red |
| `@next/font` | Absorbido por `next/font`, que ya viene con el framework |
| Biblioteca de formularios | Cuatro campos con validación nativa de HTML |

Cada dependencia no instalada es superficie de mantenimiento que no hay que sostener. La
decisión de no añadir es tan documentable como la de añadir.
