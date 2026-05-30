# Palette — Generador de Paletas y Gradientes

[![Angular](https://img.shields.io/badge/Angular-20.0-DD0031?logo=angular)](https://angular.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock)](https://gsap.com)
[![Hecho con IA](https://img.shields.io/badge/🤖-Hecho%20con%20IA-f5a623)](#-aviso-de-desarrollo-con-inteligencia-artificial)

**Palette** es una herramienta web interactiva para diseñadores y desarrolladores que permite generar paletas de color armónicas y construir gradientes CSS personalizados. Todo con una interfaz elegante, animaciones fluidas impulsadas por GSAP y persistencia local.

---

## ✨ Características

| Funcionalidad | Descripción |
|---|---|
| 🎨 **Generador de paletas** | Crea combinaciones de color basadas en 7 tipos de armonía (análoga, complementaria, tríadica, etc.) |
| 🌈 **Constructor de gradientes** | Mezcla colores en gradientes lineales o radiales con control de ángulo y paradas |
| ✨ **Animaciones GSAP** | Transiciones suaves, entrada escalonada de tarjetas, gradientes animados en movimiento perpetuo |
| 💾 **Persistencia local** | Guarda y elimina paletas favoritas en el navegador con localStorage |
| 📋 **Copiado al portapapeles** | Exporta colores individuales y código CSS de gradientes con un clic |
| 🎲 **Modo aleatorio** | Genera paletas sorpresa con distintos tipos de armonía al azar |
| 📱 **Responsive** | Diseño adaptable a cualquier tamaño de pantalla |

---

## 🚀 Tecnologías

- **[Angular 20](https://angular.dev)** — Framework standalone con lazy loading y control flow (`@for`)
- **[GSAP 3](https://gsap.com)** — Animaciones de alto rendimiento (stagger, timelines, easing)
- **Google Fonts** — Playfair Display (títulos) + Inter (UI)
- **CSS moderno** — Glassmorphism, gradientes, clamp(), backdrop-filter
- **localStorage API** — Persistencia de datos del lado del cliente

---

## 📁 Arquitectura del proyecto

```
src/app/
├── models/
│   └── types.ts                    # Interfaces compartidas (PaletteType, GradientConfig, etc.)
├── services/
│   ├── color.service.ts            # Lógica de generación: HSL↔Hex, armonías, CSS output
│   └── storage.service.ts          # CRUD sobre localStorage para paletas guardadas
├── components/
│   ├── color-card.ts               # Tarjeta individual de color con hover, copia y stagger GSAP
│   ├── gradient-preview.ts         # Preview del gradiente con animación GSAP en bucle
│   └── saved-colors.ts             # Panel lateral con paletas guardadas y borrado
├── layout/
│   └── navbar.ts                   # Barra de navegación sticky con glassmorphism y rutas
├── pages/
│   ├── home.ts                     # Landing page con orbes animados y CTAs
│   ├── palette.ts                  # Página principal del generador de paletas
│   └── gradient.ts                 # Constructor visual de gradientes
├── app.ts                          # Componente raíz (navbar + router-outlet)
├── app.config.ts                   # Configuración de providers
└── app.routes.ts                   # Definición de rutas con lazy loading
```

---

## 🛠️ Instalación y uso

```bash
# Clonar el repositorio
cd palette

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve

# Abrir en el navegador
open http://localhost:4200
```

### Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia servidor de desarrollo en `:4200` |
| `npm run build` | Compila para producción en `dist/` |
| `ng serve` | Ídem `npm start` |

---

## 🧭 Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Página de aterrizaje con animaciones de bienvenida |
| `/palette` | Paletas | Generador de paletas con selector de tipo de armonía |
| `/gradient` | Gradientes | Constructor visual de gradientes con preview en vivo |

Todas las rutas cargan sus componentes de forma diferida (*lazy loading*).

---

## 🎬 Animaciones GSAP

| Animación | Técnica | Ubicación |
|---|---|---|
| Entrada escalonada de tarjetas | `.to('.letter', { stagger, back.out })` | `color-card.ts` |
| Gradiente animado perpetuo | `.to(el, { backgroundPosition, yoyo, repeat })` | `gradient-preview.ts` |
| Transiciones de página | `.from(el, { opacity, y, duration })` | `home.ts`, `gradient.ts` |
| Orbes flotantes | `.to('.orb', { scale, yoyo, repeat })` | `home.ts` |
| Aparición del navbar | `.from(navbar, { y: -40, opacity })` | `navbar.ts` |

---

## ⚠️ Aviso de desarrollo con inteligencia artificial

Este proyecto fue desarrollado íntegramente por inteligencia artificial utilizando **OpenCode** como plataforma de interacción, con el modelo **Big Pickle** como motor de generación de código. Todo el proceso, desde la conceptualización hasta la implementación, fue orquestado a través de instrucciones conversacionales sin intervención humana directa en la escritura del código fuente.

**Detalles técnicos:**
- **Plataforma:** OpenCode
- **Modelo:** Big Pickle
- **Framework:** Angular 20 (standalone, con lazy loading)
- **Librería de animaciones:** GSAP 3.15
- **Proceso:** Instrucciones en lenguaje natural → generación automatizada de componentes, servicios, estilos y configuración

---
