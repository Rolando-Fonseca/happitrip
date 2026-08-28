# DOCS — Artefactos académicos de HappiTrip

Documentación de las sesiones de la certificación **Ingeniería de Contexto con sistemas
de IA para construir software completo**. Cada sesión produce artefactos verificables que
se suben aquí antes de integrarse al repositorio.

## Caso de estudio

El enunciado original proponía *Verflix*, un clon de Netflix con la API de TMDB en React 18
legacy. Se sustituye por **HappiTrip**, un producto propio en desarrollo real. La sustitución
conserva todas las competencias evaluadas y añade una ventaja: el sistema analizado tiene
usuarios previstos y decisiones de negocio detrás, no es un ejercicio desechable.

## Estado de entregables

| # | Artefacto | Sesión | Estado | Fecha límite |
|---|-----------|--------|--------|--------------|
| 01 | [Arquitectura y flujo de datos](S1-01-arquitectura.md) | 1 | Entregado | 2026-08-28 |
| 02 | [Mapa de componentes](S1-02-mapa-componentes.md) | 1 | Entregado | 2026-08-28 |
| 03 | [Análisis de dependencias](S1-03-dependencias.md) | 1 | Entregado | 2026-08-28 |
| 04 | [Plan de migración v0 → v1 → v2](S1-04-plan-migracion.md) | 1 | Entregado | 2026-08-28 |
| 05 | [Normas de trabajo](S1-05-normas-trabajo.md) | 1 | Entregado | 2026-08-28 |
| 06 | [Issues a abrir](S1-06-issues.md) | 1 | Entregado | 2026-08-28 |
| 07 | [Prompts base para Sesión 2](S1-07-prompts-sesion2.md) | 2 | Entregado | 2026-09-04 |
| 08 | [Capa de datos y fuentes externas](S2-01-capa-de-datos.md) | 2 | Entregado | 2026-09-04 |

## Módulos del producto

Cada módulo es un entregable independiente del portafolio.

| Módulo | Puerto | Qué demuestra | Estado |
|--------|--------|---------------|--------|
| HappiTrip Landing | 3100 | Arquitectura React 19, accesibilidad, rendimiento | **Construido** |
| HappiTrip Data | integrado en 3100 | Ingesta de APIs, contratos de datos, caché, resiliencia | **Construido** |
| HappiTrip Planner | 3102 | Ingeniería de contexto, salidas tipadas, evaluación | Pendiente |
| HappiTrip v0 (Legacy Lab) | 3103 | Deuda técnica y migración documentada | Pendiente |

## Fuentes de datos externas

| Fuente | Aporta | Licencia |
|--------|--------|----------|
| Open-Meteo Geocoding | Coordenadas, país, zona horaria, población | CC BY 4.0 |
| Open-Meteo Forecast | Temperaturas y precipitación a siete días | CC BY 4.0 |
| Wikipedia REST (es) | Resumen e imagen de cada ciudad | CC BY-SA |

Ninguna requiere clave ni cuenta. Detalle y criterios de descarte en el artefacto 08.

## Criterios de revisión aplicados

Todo artefacto de esta carpeta se revisa contra tres criterios antes de integrarse:

- **Claridad** — se entiende sin conocer el código.
- **Coherencia** — no contradice a otro artefacto ni al estado real del repositorio.
- **Trazabilidad** — cada afirmación apunta a un archivo, un commit o un issue.
