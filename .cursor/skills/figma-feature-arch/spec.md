# Spec

Reglas para pasar un diseño de Figma a una arquitectura de desarrollo.
Cada feature concreta se describe en el plan. Este archivo no cambia por feature.

## Lectura

Antes del diseño, lee `.cursor/governance.md` y `.cursor/architecture.md`.
Si este spec los contradice, mandan esos dos.

## Entrada

Sirve un link de Figma, capturas de los frames o el texto de Dev Mode.
Si el link no muestra frames, textos ni componentes, pide una captura por pantalla y detente.

## Qué sacar del diseño

Por cada frame anota:

- Nombre del frame.
- Textos, listas, imágenes, botones y formularios que se ven.
- Estado, si el diseño lo trae: vacío, carga, error o éxito.
- De qué pantalla viene y a cuál va.

Lo que el frame no muestra va a Dudas. No se completa por suposición.

## Dónde va cada pieza

- Pantalla y ruta: `src/app/`. Una ruta por frame navegable. Nombre: `algoScreen.tsx`.
- UI de la feature, formularios y componentes que solo ella usa: `src/features/<slug>/`.
- Formulario: `NombreForm.tsx` y el schema en `NombreForm.form.ts`.
- Peticiones HTTP: `src/core/api/`, un archivo `algoApi.ts` por recurso.
- Estado de cliente: `src/core/store/useAlgoStore.ts`.
- Token y secretos: `src/core/auth/`, con react-native-keychain.
- UI usada por varias features: `src/components/`.
- Textos fijos y números de layout: `src/constants/`.

## Qué herramienta corresponde

- Datos del servidor: RTK Query. El cache se limpia al cerrar sesión.
- Sesión: el store Zustand que ya existe.
- Formulario: React Hook Form. Validación: Zod.
- Lista que debe abrir sin red: SQLite con expo-sqlite.
- Foto o archivo de un mensaje: expo-file-system. SQLite guarda solo la ruta.
- Foto en pantalla: expo-image.
- Preferencia pequeña, como el tema: react-native-mmkv.
- Secreto: react-native-keychain.
- Navegación: expo Router. No agregues otra librería de navegación.

## Librerías

Usa solo las de `architecture.md`.
Si un frame necesita otra, escríbela en el plan con el frame y el motivo, marcada como "requiere aprobación". No la pongas en la skill hija hasta que esa línea esté aprobada.

## Qué lleva el plan

1. Frames leídos.
2. Rutas, con el frame de cada una.
3. Casos de uso, uno por acción del usuario.
4. Librerías y el motivo de cada una.
5. Types y objetos: dominio, request, response, schema Zod si hay formulario, y store solo si el dato no vive en RTK Query.
6. Archivos a crear.
7. Archivos a modificar, y qué parte se conserva.
8. Dudas.

## Skill de la feature

Con la frase exacta «Apruebo el plan y autorizo crear la skill», crea `.cursor/skills/<slug>/` con:

- `SKILL.md`: orden para implementar y la obligación de escribir `bitacora.md` al terminar.
- `spec.md`: el plan aprobado de esa feature (puntos 1 a 5 y las dudas).
- `files.md`: los puntos 6 y 7, un archivo por paso.
- `bitacora.md`: solo el título. La llena la skill hija al implementar.

Esa frase no autoriza a crear pantallas ni a instalar paquetes.
