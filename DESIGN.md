---
name: "Luis Torres — Engineering Labs"
description: "A bright technical signal archive for executable, measurable experiments."
colors:
  paper: "#f3f5f4"
  surface: "#fbfcfb"
  surface-alt: "#e8ecea"
  white: "#ffffff"
  ink: "#111514"
  body-text: "#313936"
  muted-text: "#66716c"
  rule: "#bcc5c1"
  rule-strong: "#7d8984"
  signal-blue: "#164ed8"
  signal-blue-dark: "#0d389f"
  signal-orange: "#ff7a2f"
  status-green: "#1d7650"
  status-red: "#b52f29"
typography:
  display:
    fontFamily: "\"Bricolage Grotesque Variable\", \"Arial Narrow\", system-ui, sans-serif"
    fontSize: "clamp(3.7rem, 7.8vw, 7.4rem)"
    fontWeight: 680
    lineHeight: 0.84
    letterSpacing: "-0.04em"
    fontVariation: "\"wdth\" 82"
  headline:
    fontFamily: "\"Bricolage Grotesque Variable\", \"Arial Narrow\", system-ui, sans-serif"
    fontSize: "clamp(1.55rem, 2.5vw, 2.25rem)"
    fontWeight: 650
    letterSpacing: "-0.025em"
  title:
    fontFamily: "\"Bricolage Grotesque Variable\", \"Arial Narrow\", system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    letterSpacing: "-0.015em"
  body:
    fontFamily: "\"Segoe UI Variable\", \"Segoe UI\", system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "\"Cascadia Mono\", \"SFMono-Regular\", Consolas, monospace"
    fontSize: "0.7rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.055em"
rounded:
  none: "0"
  status: "50%"
spacing:
  compact: "8px"
  control: "18px"
  panel: "28px"
  section: "40px"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue-dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "46px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "46px"
  text-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px"
  experiment-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "28px"
---

# Design System: Luis Torres — Engineering Labs

## Overview

**Creative North Star: "The Signal Archive"**

Cada laboratorio se presenta como una señal que puede abrirse, ejecutarse y medirse. La interfaz adopta el lenguaje de un instrumento de medición: papel técnico claro, grafito, escalas, trazas y controles rectangulares que hacen visible la relación entre hipótesis, ejecución y resultado.

El sistema es personal, técnico y directo. La expresión visual nace de la precisión y del contraste entre un título monumental, un rail de calibración y una señal dominante; no de recursos comerciales ni de una cuadrícula de portfolio. La densidad se concentra dentro del banco de pruebas y deja aire generoso alrededor del relato.

**Key Characteristics:**

- Archivo instrumental claro con estructura de medición.
- Tipografía display condensada y datos monoespaciados.
- Cobalto para la acción y naranja para señal, foco y contraste.
- Bordes rectos, reglas finas y superficies planas.
- Trazas y estados que comunican evidencia, nunca decoración gratuita.

## Colors

La paleta combina papel frío y grafito con dos señales de alta claridad: azul cobalto para acciones y navegación, naranja para trazas secundarias y foco visible.

### Primary

- **Cobalto de Señal:** acción principal, trazas activas, progreso y el borde que identifica el laboratorio seleccionado.
- **Cobalto Profundo:** estados hover, enlaces técnicos y etiquetas que necesitan autoridad sin competir con el título.

### Secondary

- **Naranja de Calibración:** foco de teclado y señal secundaria. Se reserva para puntos de atención concretos.

### Neutral

- **Papel Instrumental:** lienzo general y base del patrón de calibración.
- **Superficie de Lectura:** paneles principales, figuras y bancos de prueba.
- **Bandeja Técnica:** rail, fondos secundarios y pistas de progreso.
- **Grafito:** títulos, controles y reglas de máximo contraste.
- **Texto Operativo:** párrafos y copy funcional.
- **Anotación Atenuada:** metadatos, notas y estados no dominantes.
- **Regla y Regla Fuerte:** divisores estructurales en dos intensidades.

### Named Rules

**The Two-Signal Rule.** El cobalto comunica acción o señal primaria; el naranja comunica calibración, foco o señal secundaria. No intercambiar sus responsabilidades.

**The Paper First Rule.** Las superficies claras dominan cada pantalla. Los fondos oscuros se limitan a resultados de máquina que necesitan comportarse como consola.

## Typography

**Display Font:** Bricolage Grotesque Variable (con Arial Narrow y system-ui como respaldo)  
**Body Font:** Segoe UI Variable (con Segoe UI y system-ui como respaldo)  
**Label/Mono Font:** Cascadia Mono (con SFMono-Regular, Consolas y monospace como respaldo)

**Character:** Bricolage Grotesque aporta la silueta compacta de un archivo editorial-técnico; Segoe UI mantiene la lectura funcional y Cascadia Mono convierte estados, índices y mediciones en datos inequívocos.

### Hierarchy

- **Display:** ancho condensado, peso firme y línea muy cerrada; exclusivo para el nombre del archivo y del laboratorio.
- **Headline:** títulos de sección y del banco de pruebas; mantiene tensión editorial sin competir con el display.
- **Title:** nombres de señales futuras y piezas secundarias.
- **Body:** explicación técnica de ritmo abierto; mantener bloques legibles y, cuando sea posible, alrededor de 50–65 caracteres por línea.
- **Label:** índices, estado, runtime y metadatos; usa mayúsculas donde el contenido funciona como lectura de instrumento.

### Named Rules

**The Instrument Label Rule.** Cascadia Mono se usa solo cuando el texto representa un índice, una lectura, un estado o una coordenada del sistema.

**The One Monument Rule.** Cada superficie tiene un único título display dominante; las demás jerarquías bajan de escala con claridad.

## Layout

La composición de escritorio usa un shell de dos columnas: rail instrumental fijo de 188 px y área de contenido fluida con un máximo de 1180 px. El contenido respira con padding adaptable, mientras los paneles técnicos usan reglas continuas y grids internos para relacionar entrada, salida y evidencia.

Por debajo de 900 px el rail se comprime a 116 px y las composiciones de dos columnas pasan a una sola. A 620 px el rail se convierte en una banda superior estática, los metadatos secundarios desaparecen y todos los bancos, resúmenes y métodos se apilan. La interfaz conserva legibilidad desde 320 px sin reducir controles táctiles.

Los espacios más pequeños agrupan controles y muestras; los espacios de panel organizan contenido interno; los espacios de sección separan capítulos completos. Las proporciones de los contenedores pueden variar según el tipo de experimento, pero siempre comparten ejes, reglas y ritmo.

**The Rail and Signal Rule.** La navegación se presenta como calibración persistente en escritorio y como banda superior en móvil; la señal principal ocupa el resto del primer viewport.

## Elevation & Depth

El sistema es plano por defecto y no usa sombras decorativas. La profundidad se comunica con cambios tonales, líneas de regla, patrones de cuadrícula y fondos de consola. El único halo existente pertenece al punto de estado del rail y funciona como indicación operativa, no como elevación.

### Named Rules

**The Flat Instrument Rule.** Ningún panel flota. Para separar capas, usar una superficie tonal o una regla, nunca una sombra de tarjeta.

## Shapes

La geometría es ortogonal: botones, campos, paneles, bancos de prueba y barras de progreso conservan esquinas rectas. Los bordes finos construyen la retícula y los separadores fuertes marcan cambios de instrumento o de etapa. El círculo se reserva exclusivamente para marcadores de señal y estado.

**The Functional Circle Rule.** Una forma circular debe representar un punto medido, un estado o un marcador; no se usa como adorno ni como contenedor genérico.

## Components

Los componentes se sienten como controles de laboratorio: rectos, precisos y explícitos en sus estados.

### Buttons

- **Shape:** control rectangular sin radio, altura mínima táctil de 46 px y padding horizontal controlado.
- **Primary:** fondo cobalto con texto blanco y borde del mismo color; se reserva para abrir o ejecutar el experimento.
- **Hover / Focus:** el hover profundiza el cobalto y eleva el control 2 px; el foco visible usa un contorno naranja de 3 px con separación.
- **Secondary:** transparente con borde grafito; en hover invierte a grafito con texto blanco.
- **Sample:** control compacto transparente con regla suave; en hover cambia borde y texto a cobalto.

### Chips

- **Style:** los ejemplos sintéticos funcionan como chips rectangulares de baja altura, sin relleno y con borde de regla.
- **State:** son acciones de inserción, no filtros seleccionables; el cobalto aparece solo al interactuar.

### Cards / Containers

- **Corner Style:** completamente recto.
- **Background:** superficie de lectura o papel parcialmente translúcido sobre el lienzo.
- **Shadow Strategy:** ninguna sombra; la jerarquía depende de reglas, fondos y una barra cobalto en el experimento activo.
- **Border:** reglas de una sola línea, con intensidad fuerte en el perímetro del banco.
- **Internal Padding:** paneles entre 18 px y 38 px según viewport y densidad.

### Inputs / Fields

- **Style:** fondo blanco, borde fuerte de una línea, esquinas rectas y texto grafito.
- **Focus:** contorno global naranja claramente separado del borde.
- **Error / Disabled:** mensajes rojos para error; controles deshabilitados conservan la forma y bajan a 55% de opacidad.

### Navigation

El rail combina marca tipográfica, lecturas monoespaciadas y un punto verde de estado. En escritorio permanece fijo y ocupa toda la altura; en móvil se reduce a marca y estado dentro de una banda horizontal. Los enlaces de detalle usan cobalto profundo, peso alto y subrayado separado.

### Spectrum Plot

La visualización de señal es el componente firma. Usa una cuadrícula fina, una traza cobalto primaria, una traza naranja secundaria y un marcador vertical con etiqueta monoespaciada. Su animación revela la evidencia una sola vez y desaparece prácticamente cuando el usuario prefiere movimiento reducido.

### Experiment Bench

El banco separa estado, entrada y salida mediante reglas continuas. La entrada permanece clara; la salida usa una retícula suave y una consola grafito. En móvil, entrada y salida se apilan sin perder el orden de lectura.

## Do's and Don'ts

### Do:

- **Do** usar reglas, ejes y cambios tonales para construir jerarquía.
- **Do** reservar el cobalto para acción y señal primaria, y el naranja para foco y calibración.
- **Do** presentar resultados, límites y estados como lecturas verificables.
- **Do** adaptar el rail a banda superior y apilar el banco por debajo de 620 px.
- **Do** respetar `prefers-reduced-motion` y mantener foco de teclado de alto contraste.

### Don't:

- **Don't** convertir el catálogo en una cuadrícula de tarjetas genéricas.
- **Don't** usar esquinas redondeadas en controles o contenedores.
- **Don't** añadir sombras decorativas, brillos ambientales o paneles flotantes.
- **Don't** introducir lenguaje de venta, insignias comerciales o claims sin evidencia.
- **Don't** usar trazas o métricas ilustrativas como si fueran benchmarks ejecutados.
