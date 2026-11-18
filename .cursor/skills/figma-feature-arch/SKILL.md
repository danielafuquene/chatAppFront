---
name: figma-feature-architecture
description: A partir de un enlace de Figma o capturas, propone rutas, librerías, types y objetos de una feature. Úsala cuando pasen un link de Figma, un diseño de pantalla o pidan la arquitectura de una feature antes de implementarla.
---

# Arquitectura desde Figma

1. Lee `.cursor/governance.md` y `.cursor/architecture.md`.
2. Revisa `src/app/` y `src/features/` para no proponer una estructura distinta a la del repo.
3. Toma el diseño del mensaje: link, capturas o texto de Dev Mode.
4. Si solo hay un link y no se ven frames, textos ni componentes, detente y pide una captura por pantalla. No inventes la interfaz.
5. Lista pantallas, estados (vacío, carga, error, éxito) y datos visibles.
6. Escribe el plan con la plantilla de abajo.
7. Detente. No crees, edites ni instales nada.

## Librerías

Usa solo las de `architecture.md`. Si el diseño pide una que no está, nómbrala, di en qué frame hace falta y márcala como "requiere aprobación".

## Plantilla

# Arquitectura sugerida: [feature]

## Qué muestra el diseño

## Rutas

## Librerías

## Types y objetos

## Archivos nuevos

## Dudas

## Crear la skill de la feature

Cuando el mensaje tenga esta frase, tal cual: Apruebo el plan y autorizo crear la skill.

1. Crea `.cursor/skills/<slug-de-la-feature>/` con `SKILL.md`, `spec.md`, `files.md` y `bitacora.md`.
2. El slug sale del nombre de la feature: minúsculas y guiones.
3. Copia en esos archivos el plan ya aprobado. No inventes pantallas, tipos ni librerías que no estén en ese plan.
4. No implementes la feature en este paso.
5. Muéstrame la ruta de la carpeta y detente.
