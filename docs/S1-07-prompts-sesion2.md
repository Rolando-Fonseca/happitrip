# 07 · Prompts base para la Sesión 2 · Data Scraper

> Preparado en Sesión 1 · Entrega: 2026-09-04
> Módulo destino: **HappiTrip Data** — puerto 3101

## 1. Análisis previo: qué separa un prompt efectivo de uno confuso

Actividad de la Sesión 1, con ejemplos reales de la construcción de la landing.

| Prompt confuso | Por qué falla | Reformulación efectiva |
|---|---|---|
| «Hazme una landing bonita para viajes» | Sin criterio de aceptación. «Bonita» no es verificable, así que cualquier salida es defendible y ninguna es correcta | «Landing para planificador de Eurotrips, público joven con presupuesto ajustado. Hero con foto a sangre, titular a la izquierda y carrusel de rutas abajo a la derecha. Paleta derivada de este logo. Todo el texto en español» |
| «Usa buenos colores» | Delega el criterio sin darlo. El resultado será el promedio del sector, que es justo lo que se quería evitar | «Extrae la paleta de este logo, comprueba cada par contra WCAG AA y descarta los que no lleguen a 4,5:1 en texto» |
| «Arregla el build» | Pide un resultado sin aportar el síntoma. Obliga a adivinar dónde mirar | «El build falla con "Could not find the Next.js package" pero `node_modules/next/package.json` existe. Hay un `pnpm-workspace.yaml` en el directorio de usuario» |
| «Añade animaciones» | Sin límites, produce movimiento en todo | «Revelado al entrar en pantalla en encabezados y tarjetas. Solo `transform` y `opacity`. Curva de salida, nunca de entrada. Bajo 300 ms en interfaz, hasta 800 ms en superficies de marketing. `prefers-reduced-motion` conserva la opacidad y elimina el desplazamiento» |

**Los cuatro patrones que hacen efectivo un prompt**, extraídos de la tabla:

1. **Criterio de aceptación verificable.** «4,5:1» se comprueba; «buen contraste» se discute.
2. **Restricciones antes que objetivos.** Decir qué no hacer acota más que decir qué hacer.
3. **Síntoma y contexto, no diagnóstico.** Describir lo observado, no la causa que uno supone.
4. **Fuente de verdad explícita.** Señalar el archivo, el logo o el dato de partida.

**Antipatrón detectado en esta sesión.** Dos instrucciones del proyecto se contradecían: el
skill de tipografías recomendó Inter y el `CLAUDE.md` la prohíbe explícitamente. Se resolvió
tarde, tras haber construido la página entera. **Lección:** antes de empezar hay que resolver
los conflictos entre fuentes de contexto, no durante.

## 2. Contexto que la Sesión 2 debe recibir

Todo prompt de la Sesión 2 arranca con este bloque. Es la aplicación de DRY a los prompts:
se escribe una vez y se referencia.

```
PROYECTO: HappiTrip — planificador de itinerarios de Eurotrip.
ESTADO: prelanzamiento. La landing (v1) existe y es estática.
MÓDULO: HappiTrip Data, puerto 3101. Ingesta y normalización de datos de viaje.
CONSUMIDOR: la landing v2 y, más adelante, HappiTrip Planner (:3102).
RESTRICCIONES:
  - npm, nunca pnpm en este repositorio.
  - Puertos 3000, 4000, 5433, 5555 y 6379 están reservados: no usarlos.
  - Todo texto de cara al usuario, en español.
  - Cada decisión deja artefacto en docs/.
CONTRATO: el tipo `Ruta` de site/src/lib/rutas.ts es el contrato provisional.
```

## 3. Prompts base

### P1 · Selección de fuentes de datos

```
Necesito fuentes de datos para itinerarios de tren por Europa: ciudades,
conexiones ferroviarias, duración de trayectos y precio orientativo de
alojamiento económico.

Para cada fuente candidata dime: licencia, si permite uso comercial, límite
de peticiones, si requiere clave, formato y qué campos de nuestro contrato
`Ruta` cubre y cuáles no.

Descarta de entrada las que exijan contrato de pago o prohíban el uso
comercial. No escribas código: quiero una tabla comparativa y una
recomendación con su motivo.
```

**Por qué está redactado así:** exige criterios verificables (licencia, límites), fija un
descarte automático y prohíbe el código, que es el requisito de la sesión.

### P2 · Contrato de datos

```
A partir del tipo `Ruta` de site/src/lib/rutas.ts, propón el contrato
completo para v2: `Ruta`, `Ciudad` y `Tramo`.

Para cada campo indica: obligatorio u opcional, unidad, rango válido y qué
hace la interfaz si falta. Señala en cuáles la fuente externa puede no ser
fiable.

No amplíes el contrato con campos que ninguna pantalla usa hoy.
```

**Por qué:** la última frase evita el error más común en diseño de esquemas — modelar el
dominio entero en lugar de lo que la interfaz necesita.

### P3 · Estrategia de resiliencia

```
El módulo Data depende de APIs de terceros que fallarán. Para cada modo de
fallo —tiempo de espera agotado, límite de peticiones excedido, respuesta
malformada, campo ausente, servicio caído— define qué hace el sistema y qué
ve el usuario.

Regla: la landing nunca muestra un error de red al visitante. O sirve datos
en caché, o oculta la sección.

Entrega una tabla de modo de fallo, detección, respuesta y efecto visible.
```

### P4 · Auditoría de dependencias antes de instalar

```
Antes de instalar nada en HappiTrip Data, justifica cada dependencia
candidata: qué problema resuelve, qué pasaría sin ella, cuánto pesa y con
qué frecuencia se actualiza.

En la Sesión 1 acabamos con cuatro paquetes de Radix instalados y sin usar
por instalar antes de decidir. No repetir.
```

**Por qué:** incorpora un fallo real del proyecto como restricción. Un prompt que cita un
error concreto del historial es más efectivo que uno que apela a buenas prácticas genéricas.

### P5 · Verificación del artefacto

```
Revisa el artefacto que acabas de producir contra tres criterios:

CLARIDAD — ¿se entiende sin haber visto el código?
COHERENCIA — ¿contradice algún otro documento de docs/ o el estado real
             del repositorio?
TRAZABILIDAD — ¿cada afirmación apunta a un archivo, un commit o un issue?

Señala cada punto que falle y corrígelo. Si algo no se puede verificar,
márcalo como supuesto en lugar de afirmarlo.
```

**Por qué:** cierra el ciclo. La última frase es la más importante: convierte la
incertidumbre en información explícita en vez de en afirmación falsa.

## 4. Entregables comprometidos para la Sesión 2

| Artefacto | Fecha límite |
|---|---|
| Tabla comparativa de fuentes de datos y recomendación | 2026-09-04 |
| Contrato de datos v2 (`Ruta`, `Ciudad`, `Tramo`) | 2026-09-04 |
| Matriz de modos de fallo y respuesta | 2026-09-04 |
| Justificación de cada dependencia antes de instalarla | 2026-09-04 |
