# 05 · Normas de trabajo

> Sesión 1 · HappiTrip · 2026-08-28
> Acuerdo operativo del repositorio. Todo lo de aquí es verificable en el historial.

## 1. Ramas

| Rama | Para qué | Vida |
|---|---|---|
| `main` | Estado publicable. Siempre compila | Permanente |
| `feat/<ámbito>-<qué>` | Funcionalidad nueva | Hasta su fusión |
| `fix/<ámbito>-<qué>` | Corrección de defecto | Hasta su fusión |
| `docs/s<n>-<artefacto>` | Artefactos de una sesión académica | Hasta su fusión |
| `chore/<qué>` | Dependencias, configuración, herramientas | Hasta su fusión |

Ámbitos en uso: `landing`, `data`, `planner`, `legacy`, `docs`, `deps`.

Ejemplos reales de este proyecto: `fix/landing-contraste-tarjetas`,
`chore/deps-eliminar-radix-huerfano`, `docs/s1-arquitectura`.

**Regla.** Nada se empuja directamente a `main`. Toda rama entra por pull request, aunque
el revisor sea uno mismo: el PR es el lugar donde queda escrita la justificación.

## 2. Commits atómicos

Un commit es atómico cuando **se puede revertir solo sin romper nada más**. Esa es la
prueba, no el número de líneas.

Formato: `tipo(ámbito): descripción en imperativo`

| Tipo | Cuándo | Efecto en semver |
|---|---|---|
| `feat` | Funcionalidad nueva visible para el usuario | MINOR |
| `fix` | Corrección de un defecto | PATCH |
| `docs` | Documentación y artefactos | Ninguno |
| `style` | Formato sin cambio de comportamiento | Ninguno |
| `refactor` | Reestructuración sin cambio de comportamiento | Ninguno |
| `perf` | Mejora de rendimiento | PATCH |
| `test` | Pruebas | Ninguno |
| `chore` | Dependencias, configuración, herramientas | Ninguno |
| `BREAKING CHANGE:` en el cuerpo | Rompe compatibilidad | MAJOR |

### El historial real

El trabajo llegó como un único estado final sin versionar, no como una secuencia de cambios
en el tiempo. Fabricar commits que simulasen una cronología que no ocurrió habría sido
falsear el historial, así que se agruparon **por área funcional**: cada commit reúne los
archivos de una responsabilidad y se puede revertir solo.

| # | Commit | Mensaje |
|---|---|---|
| 1 | `1e0b999` | chore(repo): añadir kit de construcción y configuración base |
| 2 | `08ef741` | chore(landing): estructurar proyecto Next.js con TypeScript y Tailwind 4 |
| 3 | `899e2fd` | feat(landing): definir sistema de color, tipografía y metadatos SEO |
| 4 | `2d29260` | feat(landing): añadir contrato de datos y rutas de ejemplo |
| 5 | `6bdf087` | feat(landing): añadir botón con variantes, iconos de marca y wordmark |
| 6 | `fa3c5f1` | feat(landing): añadir animación de entrada reutilizable |
| 7 | `2c21539` | feat(landing): construir hero con navegación y carrusel de rutas |
| 8 | `df51d7d` | feat(landing): añadir secciones de contenido y pie de página |
| 9 | `6cb8e2b` | feat(landing): añadir formulario del planificador con alternativa mailto |
| 10 | `5411f2f` | feat(landing): añadir fotografías de rutas con sus créditos |
| 11 | `11efa03` | fix(build): fijar raíz de Turbopack fuera del workspace pnpm del usuario |
| 12 | `26d802d` | feat(data): añadir contratos y cliente HTTP resiliente |
| 13 | `a461e09` | feat(data): integrar Open-Meteo y Wikipedia como fuentes externas |
| 14 | `982d31b` | refactor(landing): convertir las ciudades en objetos del contrato |
| 15 | `8290c69` | feat(landing): añadir página de detalle de ruta con datos externos |
| 16 | `8c0c4dc` | fix(data): aceptar solo imágenes de dominios de Wikimedia |

**Dos decisiones visibles en esta lista:**

- Las correcciones van separadas de la funcionalidad que las contiene. Si mañana la
  validación de host de Wikimedia estorba, se revierte ese commit sin perder la página de
  detalle.
- El `refactor` que convierte las ciudades en objetos va **antes** que la página que las
  consume. Un commit que cambia una forma de datos nunca debe ir mezclado con el código
  que estrena esa forma: al revisar, no se distingue lo que cambió de lo que se añadió.

## 3. Versionado semántico

`MAJOR.MINOR.PATCH`. El proyecto arranca en `0.1.0`: mientras la versión mayor sea 0, la API
se considera inestable y un MINOR puede romper compatibilidad.

| Hito | Versión | Estado |
|---|---|---|
| Landing completa y compilando | `0.1.0` | Alcanzado |
| Consumo de fuentes externas y página de detalle | `0.2.0` | Alcanzado |
| Formspree conectado y contenido real | `0.3.0` | Pendiente |
| Primera publicación con dominio propio | `1.0.0` | Pendiente |

`0.2.0` sube el MINOR y no el PATCH porque añade funcionalidad visible: una ruta nueva y
datos que antes no existían. No sube el MAJOR pese a que el tipo `Ruta` cambió de forma
—`ciudades` pasó de `string[]` a `Ciudad[]`— porque en versiones `0.x` la API se declara
inestable. En `1.x` ese mismo cambio habría exigido un MAJOR.

## 4. Etiquetas y publicaciones

```bash
git tag -a v0.2.0 -m "Datos externos y página de detalle de ruta"
git push origin v0.2.0
```

Cada etiqueta se acompaña de una publicación en GitHub con tres apartados: **qué cambia**,
**qué se rompe** y **qué queda pendiente**. Una etiqueta sin publicación redactada se
considera entrega incompleta.

## 5. Verificación antes de fusionar

Ningún PR se fusiona sin estas cuatro comprobaciones. Las cuatro son ejecutables, no
opiniones:

1. `npm run build` termina con código 0.
2. `npm run lint` sin errores.
3. Captura de la sección tocada en escritorio y en móvil.
4. Si cambia algún color: ratio de contraste calculado, no estimado a ojo.

El punto 4 nace de un caso concreto: el rojo de marca elegido inicialmente daba 4,04:1 sobre
el fondo crema y no alcanzaba el mínimo AA de 4,5:1. Se detectó calculando, no mirando.

## 6. Documentación

- Toda decisión de arquitectura deja rastro en `docs/` o en un issue. Si no está escrito,
  no se tomó.
- Los artefactos llevan fecha y versión del sistema analizado en la cabecera.
- Cuando un artefacto deja de ser cierto se corrige, no se acumula una corrección al final.

## 7. Comunicación

Al ser un proyecto de dos personas con perfiles distintos —una aporta el criterio de negocio
y viajes, otra la ejecución técnica— las decisiones se separan por tipo:

| Tipo de decisión | Quién decide | Dónde queda registrada |
|---|---|---|
| Contenido, rutas, precios, tono | Negocio | Issue con etiqueta `contenido` |
| Arquitectura, dependencias, rendimiento | Técnica | Artefacto en `docs/` |
| Diseño visual | Acuerdo, con propuesta técnica previa | Capturas en el PR |

**Regla práctica.** Nada que afecte al contenido se decide dentro de un commit. Se abre
issue, se acuerda y luego se implementa.
