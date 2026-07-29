# ADR-0001: Catálogo personal de laboratorios en GitHub Pages

## Status

Accepted

## Context

Los experimentos se difunden desde perfiles personales. Presentarlos inicialmente
bajo una marca empresarial podría confundir investigación personal con una actividad
comercial o con responsabilidades de un empleador.

El catálogo necesita admitir varios laboratorios, publicar código reproducible y
ejecutar demos estáticas sin capturar datos.

## Decision

El proyecto vive en el repositorio personal público `ltorresu82/labs` y se publica
como un project site en `https://ltorresu82.github.io/labs/`.

El sitio:

- usa una identidad personal neutral;
- no menciona empresas, empleadores ni clientes;
- contiene un catálogo extensible con una ruta por laboratorio;
- usa Astro con salida estática;
- ejecuta la inferencia WebGPU en el navegador;
- descarga modelos desde su origen oficial bajo demanda;
- no incorpora backend, analítica ni captura de entradas.

## Consequences

La publicación queda separada de una actividad comercial y puede evolucionar sin
afectar otros sitios.

GitHub Pages no provee backend. Si un laboratorio necesita secretos, persistencia o
procesamiento servidor, deberá introducirse como una dependencia separada mediante
una nueva decisión.

Una futura transferencia del repositorio no redirige automáticamente la URL de
GitHub Pages; cualquier migración deberá mantener una página de transición o
actualizar los enlaces públicos.
