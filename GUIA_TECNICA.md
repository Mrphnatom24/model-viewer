# 🚀 Guía Técnica: `<model-viewer>`

Esta guía proporciona una referencia detallada para implementar y optimizar el uso del componente `<model-viewer>` de Google en aplicaciones web modernas, específicamente orientado a entornos **Next.js 14+ (App Router)**.

---

## 📋 Tabla de Contenidos
- [Atributos Principales](#-atributos-principales)
- [Compatibilidad y Navegadores](#-compatibilidad-y-navegadores)
- [Requisitos de Dispositivo](#-requisitos-de-dispositivo)
- [Implementación en Next.js](#-implementación-en-nextjs)
  - [Configuración del Layout](#1-configuración-del-layout)
  - [Componente de Página](#2-componente-de-página)
- [Consejos de Optimización](#-consejos-de-optimización)

---

## 🛠 Atributos Principales

| Atributo | Descripción | Valor / Ejemplo |
| :--- | :--- | :--- |
| **`src`** | Archivo `.GLB` principal a mostrar. | Ruta al archivo (`/models/car.glb`) |
| **`ios-src`** | Archivo `.USDZ` para visualización nativa en iOS (Quick Look). | Ruta al archivo `.usdz` |
| **`alt`** | Descripción textual para accesibilidad. | "Modelo 3D de un camaleón" |
| **`poster`** | Imagen `.webp` o `.jpg` que se muestra mientras carga el modelo. | Ruta a imagen |
| **`skybox-image`** | Imagen HDR o panorámica para iluminación y fondo. | Archivo `.hdr` |
| **`skybox-height`** | Aplana la base para simular un suelo real (evita que el objeto "flote"). | `"1m"`, `"2m"`, `"0m"` |
| **`shadow-intensity`** | Controla la opacidad de la sombra en el suelo. | `"1"`, `"2"`, etc. |
| **`camera-controls`** | Habilita la interacción (rotación y zoom) mediante gestos. | Booleano (presente/ausente) |
| **`ar`** | Activa las capacidades de Realidad Aumentada. | Booleano |
| **`ar-modes`** | Tecnologías AR a intentar (en orden de prioridad). | `"webxr scene-viewer quick-look"` |
| **`ar-scale`** | Permite o bloquea el escalado del objeto en AR. | `"auto"` (permite), `"fixed"` (bloquea) |
| **`ar-placement`** | Superficie de aterrizaje inicial. | `"floor"` (suelo), `"wall"` (paredes) |
| **`touch-action`** | **Crucial:** Controla gestos del navegador sobre el modelo. | `"none"` (evita scroll accidental) |
| **`disable-pan`** | Desactiva el desplazamiento lateral con dos dedos. | Booleano |
| **`camera-orbit`** | Posición inicial de la cámara (ángulos y distancia). | `max-camera-orbit="auto 90deg auto"` |
| **`auto-rotate`** | El modelo gira constantemente sobre su eje vertical. | Booleano |

---

## 🌐 Compatibilidad y Navegadores

Para el año **2026**, `<model-viewer>` es el estándar de oro para 3D web. No obstante, es importante diferenciar entre **Visualización** y **AR**.

### Soporte Técnico
1.  **iOS (Safari):** No soporta WebXR nativo aún para AR. Utiliza **Quick Look** (requiere el archivo `.usdz` en `ios-src`).
2.  **Android (Chrome):** Soporta **WebXR** (preferido, mantiene al usuario en el navegador). Si falla, utiliza **Scene Viewer** (App de Google).

---

## 📱 Requisitos de Dispositivo

Para garantizar que el botón de **AR** aparezca y funcione:

> [!IMPORTANT]
> **Seguridad:** El sitio **DEBE** ejecutarse bajo **HTTPS**. Las APIs de Realidad Aumentada son bloqueadas en sitios no seguros.

*   **Android:** Versión 7.0+ y *Google Play Services for AR* instalado.
*   **iOS:** Versión 12.0+ y procesador A9 o superior.

---

## 💻 Implementación en Next.js

### 1. Configuración del Layout
Asegúrate de incluir el script oficial en el `<head>`.

```tsx
// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Model Viewer Pro',
  description: 'Implementación profesional de 3D en la web',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Script necesario para cargar el componente personalizado */}
        <script 
          type="module" 
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js">
        </script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 2. Componente de Página
Usamos `"use client"` para manejar la interacción del lado del cliente.

```tsx
// app/page.tsx
"use client";

export default function Home() {
  // Definimos el tag para evitar errores de tipado simple en TS
  const ModelViewer = 'model-viewer' as any;

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Visualizador 3D Avanzado</h1>
        <p>Demostración de realismo y controles de cámara.</p>
      </header>

      <div style={{ position: 'relative', width: '100%', height: '600px', backgroundColor: '#f5f5f5', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eaeaea' }}>
        <ModelViewer 
          alt="Modelo interactivo de un Camaleón" 
          src="3dmodels/chameleon.glb" 
          ios-src="3dmodels/chameleon.usdz"
          ar 
          ar-modes="webxr scene-viewer quick-look"
          skybox-image="3dmodels/farm.hdr" 
          poster="3dmodels/chameleon.webp" 
          shadow-intensity="1" 
          camera-controls 
          touch-action="pan-y"
          skybox-height="0m"
          camera-orbit="auto 90deg auto"
          min-camera-orbit="-45deg 60deg auto" 
          max-camera-orbit="45deg 120deg auto"
          auto-rotate
          style={{ width: '100%', height: '100%', outline: 'none' }}
        >
          {/* Barra de progreso de carga customizada */}
          <div slot="progress-bar" style={{ height: '4px', backgroundColor: '#007bff' }}></div>

          {/* Botón de AR personalizado */}
          <button 
            slot="ar-button" 
            style={{ position: 'absolute', bottom: '16px', right: '16px', padding: '10px 20px', backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer' }}
          >
            👋 Ver en mi espacio
          </button>
        </ModelViewer>
      </div>
    </main>
  )
}
```

---

## 🚀 Consejos de Optimización

1.  **Tamaño del Modelo:** Intenta que tus archivos `.glb` no pesen más de **5MB-10MB** para asegurar una carga fluida en móviles.
2.  **Uso de Posters:** Siempre define un `poster`. Mejora drásticamente el LCP (Largest Contentful Paint) de tu web.
3.  **Compresión Draco:** Si el archivo es grande, usa la extensión Draco para comprimir la geometría sin perder calidad visual notable o utilizaun compresor de archivos como **glTF**.
4.  **Quick Look:** No olvides generar el archivo `.usdz` si quieres que tus usuarios de iPhone tengan la mejor experiencia AR.
