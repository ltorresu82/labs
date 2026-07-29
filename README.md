# Luis Torres — Engineering Labs

Experimentos personales y reproducibles sobre inteligencia artificial aplicada,
arquitectura de software y sistemas distribuidos.

Sitio público: <https://ltorresu82.github.io/labs/>

## Laboratorios

### SLM Browser Router

Prueba un modelo de lenguaje pequeño en el navegador para clasificar solicitudes en
español bajo un contrato JSON. El modelo se descarga bajo demanda y la inferencia se
ejecuta localmente mediante WebGPU.

El adaptador valida la respuesta antes de publicarla. Si el SLM no respeta el JSON,
aplica una recuperación determinista y marca el resultado como sujeto a revisión; no
presenta una salida inválida como éxito.

## Desarrollo

Requisitos:

- Node.js 22.12 o superior.
- Un navegador Chromium con WebGPU para ejecutar el primer laboratorio.

```powershell
npm install
npm run dev
```

Verificación:

```powershell
npm run check
npm test
npm run build
```

## Límites

- No se utilizan datos de empleadores, clientes ni proyectos privados.
- Los ejemplos incluidos son sintéticos.
- El repositorio no contiene pesos de modelos ni credenciales.
- No se publican resultados de rendimiento sin indicar dispositivo, navegador,
  modelo, cuantización y metodología.

## Aviso

Este es un proyecto técnico personal. No representa a empleadores, clientes ni
organizaciones con las que el autor mantenga una relación profesional.
