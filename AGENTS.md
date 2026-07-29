# Engineering Labs

## Scope

- Repositorio público personal de Luis Torres.
- Catálogo estático de laboratorios técnicos desplegado en GitHub Pages.
- No representa marcas empresariales, empleadores, clientes ni proyectos privados.

## Public-content guardrails

- Usar únicamente datos públicos o sintéticos.
- No incluir nombres, dominios, logotipos, clientes, sistemas, métricas ni referencias
  internas de empleadores o empresas.
- No versionar secretos, tokens, credenciales, endpoints privados ni archivos de
  configuración reales.
- Citar modelo, dataset, paper, licencia y versión cuando corresponda.
- No presentar resultados sintéticos como benchmarks medidos.
- Toda afirmación de rendimiento debe incluir dispositivo, navegador, modelo,
  cuantización, fecha y metodología.

## Architecture

- Astro genera el catálogo estático.
- GitHub Pages publica bajo el base path `/labs/`.
- Cada laboratorio vive en una ruta independiente y carga solo sus dependencias.
- Los modelos se descargan desde su origen oficial; no se guardan pesos en Git.
- La inferencia WebGPU ocurre en el navegador del visitante.
- No agregar backend, analítica, formularios o captura de entradas sin una decisión
  explícita y una revisión de privacidad.

## Verification

- Ejecutar `npm run check`, `npm run build` y `npm test` antes de publicar.
- Validar la salida construida bajo el base path `/labs/`.
- Revisar desktop y móvil en un navegador real antes de cerrar cambios visuales.
