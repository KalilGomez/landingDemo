# LandingDemo -- Landing Page para Óptica (Angular + Bootstrap)

**LandingDemo** es una landing page moderna desarrollada en **Angular
(standalone)** con **Bootstrap**, diseñada para visualizar los
servicios, productos y la identidad de marca de una óptica.\
Incluye un formulario de contacto funcional mediante **PHP**, secciones
de presentación y un diseño adaptable a cualquier rubro que necesite una
página clara, directa y enfocada en conversión.

Este proyecto forma parte de mi portfolio personal. Lo desarrollé
íntegramente, aplicando buenas prácticas de desarrollo, análisis
funcional y diseño orientado a la experiencia del usuario.

## ✨ Características principales

-   **Sección Hero** con llamada a la acción destacada\
-   **Navbar funcional** con desplazamiento suave entre secciones\
-   **Sección de servicios y productos**\
-   **CTA (Call to Action)** clara y visible\
-   **Formulario de contacto** integrado con PHP para envío de mails\
-   **Footer informativo**\
-   **Diseño responsive** gracias a Bootstrap\
-   Código estructurado en **Angular standalone**, sin módulos
    tradicionales\
-   Arquitectura simple, limpia y lista para escalar

## 🛠️ Tecnologías utilizadas

-   **Angular 17+ (standalone components)**
-   **Bootstrap 5**
-   **HTML5 / CSS3**
-   **TypeScript**
-   **PHP** para el envío de correos\
-   **Node.js + npm** para entorno de desarrollo

## 📂 Estructura del proyecto

    /src
      /app
        - componentes standalone
        - secciones de la landing
      /assets
      /styles
    /public
    backend/
      - sendMail.php
    angular.json
    package.json
    README.md

## 🚀 Instalación y ejecución

1.  Clonar el repositorio:

``` bash
git clone https://github.com/KalilGomez/landingDemo.git
cd landingDemo
```

2.  Instalar dependencias:

``` bash
npm install
```

3.  Ejecutar servidor de desarrollo:

``` bash
ng serve
```

Abrir: **http://localhost:4200**

## 📧 Integración del formulario (PHP)

El formulario envía los datos a un archivo PHP ubicado en el backend, el
cual procesa y envía el correo.\
Configurar los datos en `sendMail.php` y verificar que el hosting
soporte PHP.

## 🎨 Enfoque y diseño

-   Minimalista\
-   Limpio\
-   Fácil de adaptar\
-   Enfocado en la conversión

Aunque esta versión está orientada a una **óptica**, puede reutilizarse
para: - Servicios\
- Productos\
- Negocios locales\
- Emprendimientos\
- Startups

## 👨‍💻 Sobre el proyecto

Desarrollado completamente por mí para mostrar: - Versatilidad\
- Conocimiento en Angular y Bootstrap\
- Capacidad de análisis\
- Buenas prácticas en componentes standalone\
- Implementación de formularios reales con PHP

Es parte de mi portfolio y refleja mi nivel actual como desarrollador
front‑end.

## 📌 Roadmap

-   Optimización SEO\
-   Integración con API real\
-   Agregar animaciones\
-   Modo oscuro\
-   Tests unitarios

## 📄 Licencia

Proyecto sin licencia explícita. Uso personal o educativo.
