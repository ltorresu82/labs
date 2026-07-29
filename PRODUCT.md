# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Personas técnicas que quieren comprender y probar ideas de inteligencia artificial,
arquitectura de software y sistemas distribuidos mediante experimentos pequeños,
reproducibles y ejecutables en el navegador.

## Product Purpose

Engineering Labs es el catálogo personal de experimentos públicos de Luis Torres.
Cada laboratorio debe convertir una pregunta técnica en una demostración, resultados
observables, límites explícitos y código reproducible.

El éxito es que una persona pueda entender la hipótesis, ejecutar la prueba y revisar
el código sin confundir el laboratorio con un producto comercial o una afirmación de
producción.

## Positioning

El sitio no publica demostraciones aisladas ni artículos puramente conceptuales:
conecta hipótesis, implementación, medición y límites en una misma superficie.

## Operating Context

El proyecto se publica desde un repositorio personal y se sirve como un sitio estático
en GitHub Pages. Los experimentos pueden usar APIs del navegador, modelos abiertos y
datos sintéticos. Cuando un laboratorio necesite backend o almacenamiento, esa
dependencia debe declararse y aislarse.

## Capabilities and Constraints

- Un solo catálogo extensible con una ruta independiente por laboratorio.
- El primer laboratorio explora un SLM ejecutado localmente mediante WebGPU.
- No incluir datos de empleadores, clientes ni proyectos privados.
- No publicar secretos, credenciales, endpoints privados ni pesos de modelos en Git.
- Los modelos y datasets externos deben indicar origen, versión y licencia.
- Los resultados ilustrativos deben marcarse como sintéticos; los benchmarks solo se
  publican después de ejecutarse.
- El sitio no ofrece servicios comerciales, pagos, autenticación ni captura de datos.
- Los experimentos deben degradar con claridad cuando una capacidad del navegador no
  está disponible.

## Brand Commitments

- Nombre público: Luis Torres — Engineering Labs.
- Voz: personal, técnica, directa y honesta.
- La identidad debe ser neutral y no usar nombres, dominios, logotipos ni llamados
  comerciales de empresas o del empleador del autor.
- El sitio debe aclarar que son experimentos personales y no representan a empleadores
  ni clientes.

## Evidence on Hand

- Primer concepto: clasificación de solicitudes en español con
  `Qwen2.5-0.5B-Instruct` en el navegador.
- Fuentes técnicas: Transformers.js, WebGPU, Hugging Face y el paper de NVIDIA sobre
  SLMs en sistemas agénticos.
- No existen todavía benchmarks ejecutados ni resultados autorizados para publicar.

## Product Principles

1. Demostrar antes de afirmar.
2. Publicar límites junto con resultados.
3. Mantener cada experimento reproducible y verificable.
4. Usar únicamente datos públicos o sintéticos.
5. Separar con claridad investigación personal y actividad comercial.

## Accessibility & Inclusion

La experiencia debe funcionar con teclado, mantener contraste WCAG AA, respetar
`prefers-reduced-motion`, ser legible desde 320 px y explicar alternativas cuando
WebGPU no esté disponible.
