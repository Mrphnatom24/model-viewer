# 📦 Proyecto: Implementación de `<model-viewer>`

Este proyecto es una guía práctica que ejemplifica el uso y la configuración del componente web **`<model-viewer>`** para la visualización de objetos 3D en la web.

## 📂 Estructura de Activos (`/public/3dmodels`)

Para asegurar un rendimiento óptimo y una buena experiencia de usuario, los recursos se organizan de la siguiente manera:

* **🕹️ Modelo 3D (`.glb`):** El archivo principal que contiene la geometría, texturas y animaciones del modelo.
* **🖼️ Poster (`.webp`):** Una imagen ligera que actúa como *placeholder* o previsualización mientras el modelo 3D termina de cargarse.
* **🌅 Environment Image (`.hdr`):** Imagen de alto rango dinámico utilizada para la iluminación global y los reflejos del modelo.

---

## 🛠️ Notas de Implementación: El desafío del HDR

Actualmente, existe un problema al intentar cargar directamente archivos `.hdr`, u otras extensiones, como `environment-image`.

> **💡 Dato técnico:** Los navegadores y `<model-viewer>` a menudo requieren que los archivos `.hdr` (latlong) sean procesados o convertidos a formatos que el motor de renderizado pueda leer eficientemente, como archivos **`.jhdr`** o **equirectangulares optimizados**.