# 06 · Issues a abrir

> Sesión 1 · HappiTrip · 2026-08-28
> Los tres primeros son los que exige el enunciado. El resto sale de hallazgos reales de
> esta sesión. Cada uno indica su artefacto de origen para mantener la trazabilidad.

## Etiquetas

`arquitectura` · `dependencias` · `refactor` · `contenido` · `accesibilidad` · `deuda` · `bloqueante`

---

## #1 · Arquitectura: invertir el acoplamiento de datos antes de la v2

**Etiquetas:** `arquitectura` `refactor`
**Origen:** artefactos 02 §3 y 04 §4
**Bloquea a:** #6

`RutasSeccion` y `RutasCarrusel` importan `RUTAS` directamente desde `lib/rutas.ts` en lugar
de recibirla por props. Hoy funciona porque la fuente es un array estático, pero acopla los
componentes a una fuente concreta y les impide reutilizarse con datos de API.

**Qué hay que hacer**
- Pasar los datos por props desde el componente de servidor que los consume.
- Congelar el tipo `Ruta` como contrato y versionarlo.

**Criterio de aceptación**
- Ningún componente de `components/site/` importa de `lib/rutas.ts`.
- Los componentes se pueden renderizar con un array arbitrario de `Ruta`.

---

## #2 · Dependencias: eliminar cuatro paquetes de Radix sin usar

**Etiquetas:** `dependencias` `deuda`
**Origen:** artefacto 03 §2

`@radix-ui/react-dialog`, `@radix-ui/react-label`, `@radix-ui/react-navigation-menu` y
`@radix-ui/react-separator` están instalados con **cero referencias** en el código. Se
instalaron previendo el uso del CLI de shadcn, que finalmente no se usó.

**Qué hay que hacer**

```bash
npm uninstall @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-navigation-menu @radix-ui/react-separator
```

**Criterio de aceptación**
- `npm run build` sigue en verde.
- El menú móvil y el formulario siguen funcionando.

---

## #3 · Refactor futuro: decidir sobre la tarjeta de ruta duplicada

**Etiquetas:** `refactor` `deuda`
**Origen:** artefacto 02 §4

La tarjeta de ruta existe en dos formas: 3:4 con datos mínimos en el carrusel del hero y 4:5
con resumen y ciudades en la sección de rutas. Hoy la duplicación es deliberada — unificarlas
exigiría un componente con seis props booleanas, que sería peor.

**Qué hay que hacer**
- No actuar todavía. Revisar cuando aparezca una tercera variante.
- Si aparece, extraer un componente de presentación con composición mediante `children`, no
  con banderas booleanas.

**Criterio de aceptación**
- Este issue permanece abierto como registro de deuda consciente hasta que se cumpla el
  disparador.

---

## #4 · Contenido: sustituir los marcadores de posición antes de publicar

**Etiquetas:** `contenido` `bloqueante`
**Origen:** revisión del código, marcados con `TODO`

| Marcador | Archivo | Valor actual |
|---|---|---|
| Correo de contacto | `planificador.tsx` | `hola@happitrip.com` — inventado |
| ID de Formspree | `planificador.tsx` | Vacío: usa `mailto:` como alternativa |
| Dominio | `layout.tsx` | `https://happitrip.com` |
| Redes sociales | `footer.tsx` | Ambos enlaces apuntan a `#` |
| Testimonios | `testimonios.tsx` | Tres citas de muestra, marcadas como ejemplo |
| Rutas y precios | `lib/rutas.ts` | Estimaciones, no itinerarios reales |

**Criterio de aceptación**
- Cero `TODO` en `site/src/`.
- El aviso «Contenido de ejemplo» de los testimonios desaparece solo cuando haya opiniones
  reales, nunca antes.

---

## #5 · Accesibilidad: verificar navegación por teclado y lectores de pantalla

**Etiquetas:** `accesibilidad`
**Origen:** hueco detectado en la revisión de la Sesión 1

El contraste está verificado por cálculo y la semántica revisada sobre el HTML generado, pero
**no se ha probado la navegación real con teclado ni con lector de pantalla**.

**Qué hay que hacer**
- Recorrer la página con el tabulador: comprobar que el orden de foco sigue al orden visual y
  que el foco es visible en todo momento.
- Comprobar que el menú móvil devuelve el foco al botón que lo abrió al cerrarse.
- Verificar que el carrusel es operable sin ratón.
- Comprobar que el cambio de estado del formulario a «Recibido» se anuncia.

**Criterio de aceptación**
- Toda función accesible sin ratón.
- Ningún elemento interactivo alcanzable sin indicador de foco visible.

---

## #6 · Arquitectura: definir el contrato de datos para HappiTrip Data

**Etiquetas:** `arquitectura`
**Origen:** artefacto 04 §4 · preparación de la Sesión 2
**Depende de:** #1

Antes de escribir una sola línea del módulo de ingesta hay que fijar qué forma tienen los
datos y quién garantiza esa forma.

**Qué hay que hacer**
- Fijar el contrato de `Ruta`, `Ciudad` y `Tramo`.
- Decidir qué campos son obligatorios y cuáles pueden faltar sin romper la interfaz.
- Definir qué ocurre cuando una fuente externa no responde: ¿se sirve caché, se oculta la
  sección, se degrada?

**Criterio de aceptación**
- Contrato escrito y revisado **antes** de elegir la fuente de datos, no después.

---

## Tablero

Columnas del GitHub Project: `Backlog` → `En curso` → `En revisión` → `Hecho`.

| Issue | Columna inicial | Fecha límite |
|---|---|---|
| #2 Dependencias huérfanas | En curso | 2026-08-29 |
| #4 Marcadores de posición | Backlog | 2026-09-05 |
| #5 Accesibilidad | Backlog | 2026-09-05 |
| #1 Acoplamiento de datos | Backlog | 2026-09-11 |
| #6 Contrato de datos | Backlog | 2026-09-04 |
| #3 Tarjeta duplicada | Backlog | Sin fecha: esperando disparador |
