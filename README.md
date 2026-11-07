# Web Personal & Portafolio - Juan José Marco Ortega

Sitio web personal moderno, responsivo y profesional diseñado para ser alojado en **Cloudflare Pages**. 

---

## 🚀 Características Principales

- **Diseño Responsive:** Adaptado a móviles, tablets y ordenadores de escritorio.
- **Modo Claro / Modo Oscuro:** Conmutador interactivo con detección automática del sistema y persistencia en `localStorage`.
- **Información 100% Real:** Datos extraídos y consolidados desde la estrategia de perfil profesional y curriculum:
  - **Sección Hero:** Nombre, titular profesional, frase de presentación, etiquetas y terminal interactiva de presentación.
  - **Sobre Mí:** Narrativa real, madurez profesional, resiliencia y valores clave tras más de una década gestionando negocios propios.
  - **Habilidades & Tecnologías:** Python, SQL, Linux Bash, Git & GitHub, Agentes de IA (Google Antigravity), maquetación web y diseño gráfico.
  - **Servicios & Proyectos:** Filtro interactivo para ver servicios (Automatización IA, Desarrollo Web, Modelado SQL) y proyectos/experiencias.
  - **Trayectoria Profesional:** Línea de tiempo visual (Conquer Blocks, Restauración en Buenos Aires, Lincedesign, Comercial Marco, Instituto Marking).
  - **Contacto & Redes Sociales:** Botones directos a LinkedIn, GitHub, WhatsApp, llamada directa y botón con copia rápida del email al portapapeles.
  - **Descarga de CV:** Enlaces directos tanto al **CV Completo** (`cv-juan-jose-marco-ortega-completo.pdf`) como a la **versión ejecutiva de 1 página** (`cv-juan-jose-marco-ortega-resumido.pdf`).

---

## 📁 Estructura de Archivos

```
web-personal-cloudflare/
├── index.html                             # Estructura semántica HTML5 accesible
├── style.css                              # Estilos CSS modernos, variables, temas y responsive design
├── script.js                              # Interactividad (tema, menú móvil, filtros, portapapeles)
├── cv-juan-jose-marco-ortega-completo.pdf # Curriculum Vitae versión completa y detallada
├── cv-juan-jose-marco-ortega-resumido.pdf # Curriculum Vitae versión ejecutiva de 1 página
├── foto_perfil_oval.png                   # Fotografía de perfil ovalada (Hero & CV)
├── foto_perfil.jpg                        # Fotografía de perfil para previsualización social (Open Graph)
├── favicon.svg                            # Icono vectorial de la pestaña del navegador
├── _headers                               # Cabeceras de seguridad y caché en Cloudflare Edge
├── 404.html                               # Página de error 404 con diseño integrado
├── robots.txt                             # Directivas para motores de búsqueda
└── README.md                              # Documentación del proyecto
```

---

## 🌐 Cómo Probar en Local

1. Puedes abrir directamente el archivo `index.html` con cualquier navegador (doble clic o clic derecho > *Abrir con* > Chrome / Edge / Firefox).
2. O iniciar un servidor local con Python desde la terminal:
   ```bash
   python -m http.server 8000
   ```
   Y abrir en tu navegador: `http://localhost:8000`

---

## ☁️ Despliegue en Cloudflare Pages

1. Haz commit y push de tus archivos a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "feat: web personal completa con datos de CV, servicios, proyectos y redes"
   git push origin main
   ```
2. Entra en el panel de **Cloudflare Dashboard** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Selecciona tu repositorio `web-personal-cloudflare`.
4. En la configuración de build:
   - **Framework preset:** `None`
   - **Build command:** (dejar vacío)
   - **Build output directory:** (dejar la raíz o vacío)
5. ¡Listo! Cloudflare generará tu URL personalizada con certificado SSL gratuito y despliegue instantáneo.
