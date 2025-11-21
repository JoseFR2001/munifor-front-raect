# 🏛️ MuniFor - Sistema de Gestión Municipal (Frontend)

<div align="center">

![React](https://img.shields.io/badge/React-19.0.0--rc.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)

**Interfaz de Usuario para Sistema de Gestión Municipal y Reportes Ciudadanos**

[Características](#-características-destacadas) • [Instalación](#-instalación-y-configuración) • [Tecnologías](#️-stack-tecnológico) • [Arquitectura](#️-arquitectura-del-sistema)

</div>

---

## 🎓 Contexto Académico

Este proyecto ha sido desarrollado como **Trabajo Final** de la asignatura **Prácticas Profesionales II**, correspondiente al primer año de la carrera **Tecnicatura Superior en Desarrollo de Software Multiplataforma** del **Instituto Politécnico Formosa**.

### Objetivo Académico

El desarrollo de MuniFor representa la aplicación práctica de los conocimientos adquiridos en áreas fundamentales del desarrollo de software, incluyendo:

- **Desarrollo Frontend Moderno**: Implementación de aplicaciones SPA con React 19 y las últimas tecnologías
- **Gestión de Estado**: Aplicación de Context API y hooks personalizados para estado global
- **Validación de Formularios**: Uso de React Hook Form con validaciones Zod para garantizar integridad de datos
- **Visualización de Datos**: Integración de bibliotecas especializadas (Leaflet para mapas, Chart.js para gráficos)
- **Diseño Responsive**: Implementación de interfaces adaptativas con Tailwind CSS 4
- **Consumo de APIs**: Comunicación eficiente con backend mediante fetch API y manejo de FormData
- **Seguridad Frontend**: Implementación de autenticación JWT y protección de rutas por roles
- **Arquitectura Escalable**: Organización modular de componentes siguiendo mejores prácticas

Este proyecto no solo cumple con los requisitos académicos establecidos, sino que también aborda una problemática real de gestión municipal, demostrando la capacidad de crear soluciones tecnológicas que impactan positivamente en la comunidad y mejoran la comunicación entre ciudadanos y gobierno local.

---

## 🔗 Repositorio Backend

Este proyecto es el **frontend React** de MuniFor. Para un sistema completo funcional, necesitas el backend API:

**Backend Repository**: [https://github.com/JoseFR2001/munifor-back.git](https://github.com/JoseFR2001/munifor-back.git)

El backend proporciona:

- 🔐 API RESTful con autenticación JWT
- 🗄️ Base de datos MongoDB con Mongoose
- 📤 Gestión de carga de imágenes con Multer
- 📊 Endpoints para estadísticas y dashboards
- 🔄 Sistema de roles y permisos
- ⚡ Auto-completado en cascada de tareas

---

## 📋 Índice

1. [Resumen Ejecutivo](#-resumen-ejecutivo)
2. [Arquitectura del Sistema](#-arquitectura-del-sistema)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Módulos por Rol de Usuario](#-módulos-por-rol-de-usuario)
6. [Funcionalidades Principales](#-funcionalidades-principales)
7. [Flujos de Datos](#-flujos-de-datos)
8. [Componentes Técnicos Clave](#-componentes-técnicos-clave)
9. [Validaciones y Reglas de Negocio](#-validaciones-y-reglas-de-negocio)
10. [Instalación y Configuración](#-instalación-y-configuración)
11. [Comandos de Desarrollo](#-comandos-de-desarrollo)
12. [Endpoints del Backend](#-endpoints-del-backend)

---

## 🎯 Resumen Ejecutivo

**MuniFor** es una aplicación web moderna de gestión municipal diseñada para digitalizar y optimizar la comunicación entre ciudadanos y la administración municipal. El sistema permite a los ciudadanos reportar problemas urbanos, mientras que operadores, trabajadores y administradores gestionan, asignan y resuelven estas solicitudes de manera eficiente.

### 🎨 Características Destacadas

- ✅ **Sistema de roles multinivel** (Ciudadano, Trabajador, Operador, Administrador)
- ✅ **Geolocalización en tiempo real** con mapas interactivos (Leaflet)
- ✅ **Gestión de imágenes** con preview y validación
- ✅ **Dashboard personalizado** por rol con estadísticas en tiempo real
- ✅ **Sistema de tareas y cuadrillas** para trabajadores municipales
- ✅ **Reportes de progreso** con seguimiento fotográfico
- ✅ **Análisis y gráficos** con Chart.js (barras, líneas, donas)
- ✅ **Filtros avanzados** por estado, tipo, prioridad y tiempo
- ✅ **Autenticación JWT** con protección de rutas
- ✅ **UI moderna y responsive** con Tailwind CSS

---

## 🏗️ Arquitectura del Sistema

### Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVEGADOR DEL USUARIO                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   FRONTEND - REACT SPA                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React 19 RC + Vite 7.1.7 + Tailwind CSS 4.1.17       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Context    │  │    Hooks     │  │   Schemas    │      │
│  │  (UserCtx)   │  │  (useFetch)  │  │    (Zod)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Layouts    │  │   Components │  │    Pages     │      │
│  │  (por Rol)   │  │   (Mapas,    │  │  (por Rol)   │      │
│  │              │  │   Gráficos)  │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ REST API (JSON/FormData)
                           │ Authorization: Bearer <JWT>
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   BACKEND - Node.js API                      │
│                   (http://localhost:3000/api)                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   BASE DE DATOS - MongoDB                    │
└─────────────────────────────────────────────────────────────┘
```

### Patrón de Diseño: Component-Based Architecture

El proyecto utiliza una **arquitectura basada en componentes** con separación de responsabilidades:

1. **Presentación (Pages)**: Páginas específicas por rol
2. **Lógica de UI (Components)**: Componentes reutilizables
3. **Lógica de Negocio (Hooks)**: Custom hooks para fetch y filtros
4. **Estado Global (Context)**: UserContext para autenticación
5. **Validación (Schemas)**: Validación con Zod
6. **Enrutamiento (Layouts)**: Layouts protegidos por rol

---

## 🛠️ Stack Tecnológico

### Frontend Core

| Tecnología           | Versión     | Propósito               |
| -------------------- | ----------- | ----------------------- |
| **React**            | 19.0.0-rc.1 | Biblioteca UI principal |
| **Vite**             | 7.1.7       | Build tool y dev server |
| **React Router DOM** | 7.9.5       | Enrutamiento SPA        |
| **Tailwind CSS**     | 4.1.17      | Framework de estilos    |

### Gestión de Formularios y Validación

| Tecnología              | Versión | Propósito              |
| ----------------------- | ------- | ---------------------- |
| **React Hook Form**     | 7.65.0  | Gestión de formularios |
| **Zod**                 | 4.1.12  | Validación de schemas  |
| **@hookform/resolvers** | 5.2.2   | Integración RHF + Zod  |

### Visualización de Datos

| Tecnología          | Versión    | Propósito                    |
| ------------------- | ---------- | ---------------------------- |
| **Leaflet**         | 1.9.4      | Mapas interactivos           |
| **React Leaflet**   | 5.0.0-rc.2 | Integración Leaflet + React  |
| **Chart.js**        | 4.5.1      | Gráficos estadísticos        |
| **React ChartJS 2** | 5.3.1      | Integración Chart.js + React |

### Utilidades

| Tecnología            | Versión | Propósito                 |
| --------------------- | ------- | ------------------------- |
| **jwt-decode**        | 4.0.0   | Decodificación de JWT     |
| **@headlessui/react** | 2.2.9   | Componentes UI accesibles |

### DevDependencies

| Tecnología                   | Versión | Propósito                |
| ---------------------------- | ------- | ------------------------ |
| **ESLint**                   | 9.36.0  | Linting de código        |
| **@vitejs/plugin-react-swc** | 4.1.0   | Compilador React (SWC)   |
| **PostCSS**                  | 8.5.6   | Procesador CSS           |
| **Autoprefixer**             | 10.4.21 | Prefijos CSS automáticos |

---

## 📁 Estructura del Proyecto

```
munifor-front-react/
│
├── 📄 index.html                    # HTML principal (punto de entrada)
├── 📄 package.json                  # Dependencias del proyecto
├── 📄 vite.config.js               # Configuración de Vite
├── 📄 tailwind.config.js           # Configuración de Tailwind
├── 📄 eslint.config.js             # Configuración de ESLint
├── 📄 postcss.config.js            # Configuración de PostCSS
├── 📄 README.md                     # Documentación del proyecto
│
├── 📂 public/                       # Archivos públicos estáticos
│
└── 📂 src/                          # Código fuente
    │
    ├── 📄 main.jsx                  # Punto de entrada React
    ├── 📄 App.jsx                   # Componente raíz con enrutamiento
    ├── 📄 index.css                 # Estilos globales + Tailwind
    │
    ├── 📂 assets/                   # Recursos estáticos
    │   └── 📂 img/                  # Imágenes
    │
    ├── 📂 context/                  # Context API de React
    │   └── 📄 UserContext.jsx       # Contexto de autenticación
    │
    ├── 📂 hooks/                    # Custom Hooks
    │   ├── 📄 useFetch.js          # Hook para peticiones HTTP
    │   └── 📄 useFilter.js         # Hook para filtrado de datos
    │
    ├── 📂 schemas/                  # Validación con Zod
    │   ├── 📄 LoginSchema.js       # Validación de login
    │   ├── 📄 RegisterSchema.js    # Validación de registro
    │   ├── 📄 ReportSchema.js      # Validación de reportes
    │   ├── 📄 TaskSchema.js        # Validación de tareas
    │   ├── 📄 CrewSchema.js        # Validación de cuadrillas
    │   └── 📄 UpdatePasswordSchema.js
    │
    ├── 📂 utils/                    # Utilidades
    │   ├── 📄 formatDate.js        # Formateo de fechas
    │   ├── 📄 getIconMap.js        # Iconos para mapas
    │   └── 📄 icons.js             # Definición de iconos
    │
    ├── 📂 layout/                   # Layouts por rol
    │   ├── 📄 GeneralLayout.jsx    # Layout público
    │   ├── 📄 CitizenLayout.jsx    # Layout de ciudadano
    │   ├── 📄 WorkerLayout.jsx     # Layout de trabajador
    │   ├── 📄 OperatorLayout.jsx   # Layout de operador
    │   └── 📄 AdminLayout.jsx      # Layout de administrador
    │
    ├── 📂 components/               # Componentes reutilizables
    │   ├── 📄 Footer.jsx
    │   ├── 📄 Carousel.jsx
    │   ├── 📄 InfoCard.jsx
    │   ├── 📄 ImageUploader.jsx    # Componente de subida de imágenes
    │   ├── 📄 FormRegister.jsx     # Formulario de registro
    │   ├── 📄 CreateTaskModal.jsx
    │   ├── 📄 Pagination.jsx
    │   │
    │   ├── 📂 navbars/             # Navbars por rol
    │   │   ├── 📄 GeneralNavBar.jsx
    │   │   ├── 📄 CitizenNavBar.jsx
    │   │   ├── 📄 WorkerNavBar.jsx
    │   │   ├── 📄 OperatorNavBar.jsx
    │   │   ├── 📄 AdminNavBar.jsx
    │   │   └── 📄 NavBarMenu.jsx
    │   │
    │   ├── 📂 LeafletMaps/         # Componentes de mapas
    │   │   ├── 📄 GlobalLeafletMap.jsx      # Mapa completo con filtros
    │   │   ├── 📄 CitizenLeafletMap.jsx     # Mapa para ciudadanos
    │   │   ├── 📄 ReportLeafletMap.jsx      # Mapa de reportes
    │   │   ├── 📄 AsideFilterMap.jsx        # Panel de filtros
    │   │   ├── 📄 NoUserAsideFilterMap.jsx
    │   │   ├── 📄 AsideDetailsPanel.jsx
    │   │   └── 📄 MapClick.jsx
    │   │
    │   ├── 📂 Chart/               # Componentes de gráficos
    │   │   ├── 📄 ChartBar.jsx     # Gráfico de barras
    │   │   ├── 📄 ChartLine.jsx    # Gráfico de líneas
    │   │   └── 📄 ChartDoughnut.jsx # Gráfico de dona
    │   │
    │   ├── 📂 details/             # Paneles de detalles
    │   │   ├── 📄 ReportDetails.jsx
    │   │   ├── 📄 TaskDetails.jsx
    │   │   ├── 📄 CrewDetails.jsx
    │   │   ├── 📄 ProfileDetails.jsx
    │   │   ├── 📄 ProgressWorkerDetail.jsx
    │   │   └── 📄 AdvancedDetails.jsx
    │   │
    │   └── 📂 profile/             # Gestión de perfil
    │       ├── 📄 Profile.jsx
    │       └── 📄 UpdateProfile.jsx
    │
    └── 📂 pages/                    # Páginas de la aplicación
        │
        ├── 📂 General/             # Páginas públicas
        │   ├── 📄 Home.jsx
        │   ├── 📄 Login.jsx
        │   ├── 📄 CitizenRegister.jsx
        │   ├── 📄 ForgotPassword.jsx
        │   ├── 📄 UpdatePassword.jsx
        │   └── 📄 FAQ.jsx
        │
        ├── 📂 Citizen/             # Páginas de ciudadano
        │   ├── 📄 CitizenDashboard.jsx
        │   ├── 📄 CitizenProfile.jsx
        │   ├── 📄 CitizenReports.jsx    # Crear reportes
        │   ├── 📄 ReportStatus.jsx      # Ver estado de reportes
        │   └── 📄 Contact.jsx
        │
        ├── 📂 Worker/              # Páginas de trabajador
        │   ├── 📄 WorkerDashboard.jsx
        │   ├── 📄 WorkerProfile.jsx
        │   ├── 📄 WorkerTasks.jsx       # Ver tareas asignadas
        │   ├── 📄 WorkerTeam.jsx        # Ver cuadrilla
        │   ├── 📄 WorkerProgress.jsx    # Reportar avance
        │   ├── 📄 WorkerProgressHistory.jsx
        │   └── 📄 WorkerRegister.jsx
        │
        ├── 📂 Operator/            # Páginas de operador
        │   ├── 📄 OperatorDashboard.jsx
        │   ├── 📄 OperatorProfile.jsx
        │   ├── 📄 OperatorReports.jsx        # Gestionar reportes
        │   ├── 📄 OperatorTasks.jsx          # Gestionar tareas
        │   ├── 📄 OperatorCreateTask.jsx     # Crear tareas
        │   ├── 📄 OperatorTeams.jsx          # Gestionar cuadrillas
        │   ├── 📄 OperatorCreateTeam.jsx     # Crear cuadrillas
        │   ├── 📄 OperatorWorkerProgress.jsx # Ver avance de trabajadores
        │   ├── 📄 OperatorMap.jsx            # Mapa con filtros
        │   ├── 📄 OperatorStatistics.jsx     # Estadísticas
        │   ├── 📄 OperatorProfileSearch.jsx
        │   └── 📄 OperatorRegister.jsx
        │
        └── 📂 Admin/               # Páginas de administrador
            ├── 📄 AdminDashboard.jsx
            ├── 📄 AdminProfile.jsx
            ├── 📄 AdminStatistics.jsx        # Estadísticas completas
            ├── 📄 AdminMap.jsx               # Mapa global
            ├── 📄 AdminGlobalView.jsx        # Vista general del sistema
            ├── 📄 RegistrationRequests.jsx   # Aprobar/rechazar registros
            ├── 📄 AdminProfileSearch.jsx     # Gestionar usuarios
            └── 📄 AdminRegister.jsx
```

---

## 👥 Módulos por Rol de Usuario

### 🏠 General (Público - Sin autenticación)

**Rutas**: `/`, `/login`, `/register`, `/forgotpassword`, `/faq`

| Página              | Ruta              | Funcionalidad                                |
| ------------------- | ----------------- | -------------------------------------------- |
| **Home**            | `/`               | Página de inicio con información del sistema |
| **Login**           | `/login`          | Autenticación con JWT                        |
| **CitizenRegister** | `/register`       | Registro público de ciudadanos               |
| **ForgotPassword**  | `/forgotpassword` | Recuperación de contraseña                   |
| **FAQ**             | `/faq`            | Preguntas frecuentes                         |

---

### 👤 Ciudadano

**Rutas**: `/citizen/*`  
**Layout**: `CitizenLayout` con `CitizenNavBar`

| Página               | Ruta                    | Funcionalidad                                                                                        |
| -------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| **CitizenDashboard** | `/citizen/dashboard`    | Dashboard con estadísticas de reportes (Pendiente, Revisado, Aceptado, Completado, Rechazado, Total) |
| **CitizenReports**   | `/citizen/reports`      | Crear nuevos reportes con imágenes (hasta 5, 15MB c/u) y ubicación en mapa                           |
| **ReportStatus**     | `/citizen/reportstatus` | Ver estado de todos los reportes enviados                                                            |
| **Contact**          | `/citizen/contact`      | Formulario de contacto                                                                               |
| **CitizenProfile**   | `/citizen/profile`      | Editar perfil personal                                                                               |

**Funcionalidades clave**:

- ✅ Crear reportes con validación Zod
- ✅ Subir imágenes con preview
- ✅ Seleccionar ubicación en mapa interactivo
- ✅ Seguimiento del estado de reportes
- ✅ Dashboard con estadísticas personales

---

### 👷 Trabajador

**Rutas**: `/worker/*`  
**Layout**: `WorkerLayout` con `WorkerNavBar`

| Página                    | Ruta                       | Funcionalidad                                                                   |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| **WorkerDashboard**       | `/worker/dashboard`        | Dashboard con estadísticas de tareas (Total, Pendiente, En Proceso, Completada) |
| **WorkerTasks**           | `/worker/tasks`            | Ver tareas asignadas a su cuadrilla                                             |
| **WorkerProgress**        | `/worker/progress`         | Reportar avance de tareas con imágenes                                          |
| **WorkerProgressHistory** | `/worker/progress-history` | Historial de reportes de avance enviados                                        |
| **WorkerTeam**            | `/worker/team`             | Ver información de su cuadrilla                                                 |
| **WorkerProfile**         | `/worker/profile`          | Editar perfil personal                                                          |

**Funcionalidades clave**:

- ✅ Ver tareas asignadas a su cuadrilla
- ✅ Aceptar tareas
- ✅ Reportar progreso con imágenes
- ✅ Ver historial de avances
- ✅ Consultar miembros de cuadrilla

---

### 🔧 Operador

**Rutas**: `/operator/*`  
**Layout**: `OperatorLayout` con `OperatorNavBar`

| Página                     | Ruta                        | Funcionalidad                                                                                                           |
| -------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **OperatorDashboard**      | `/operator/dashboard`       | Dashboard con estadísticas (Nuevos reportes, Rechazados, En proceso, Completados, Cuadrillas activas, Tareas asignadas) |
| **OperatorReports**        | `/operator/reports`         | Gestionar reportes ciudadanos (revisar, aceptar, rechazar)                                                              |
| **OperatorTasks**          | `/operator/tasks`           | Gestionar tareas del sistema                                                                                            |
| **OperatorCreateTask**     | `/operator/create-task`     | Crear nuevas tareas y asignar a cuadrillas                                                                              |
| **OperatorTeams**          | `/operator/teams`           | Gestionar cuadrillas                                                                                                    |
| **OperatorCreateTeam**     | `/operator/create-team`     | Crear nuevas cuadrillas                                                                                                 |
| **OperatorWorkerProgress** | `/operator/worker-progress` | Ver reportes de progreso de trabajadores                                                                                |
| **OperatorMap**            | `/operator/map`             | Mapa global con filtros avanzados (tipo, estado, prioridad, tiempo)                                                     |
| **OperatorStatistics**     | `/operator/statistics`      | Estadísticas y gráficos detallados                                                                                      |
| **OperatorProfile**        | `/operator/profile`         | Editar perfil personal                                                                                                  |

**Funcionalidades clave**:

- ✅ Gestión completa de reportes
- ✅ Crear y asignar tareas a cuadrillas
- ✅ Gestionar cuadrillas (crear, editar, asignar trabajadores)
- ✅ Monitorear progreso de trabajadores
- ✅ Mapa global con filtros avanzados
- ✅ Estadísticas con gráficos (Chart.js)

---

### 👨‍💼 Administrador

**Rutas**: `/admin/*`  
**Layout**: `AdminLayout` con `AdminNavBar`

| Página                   | Ruta                          | Funcionalidad                                                                                                           |
| ------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **AdminDashboard**       | `/admin/dashboard`            | Dashboard completo del sistema (Total usuarios, reportes, trabajadores activos, operadores activos, tasa de eficiencia) |
| **AdminStatistics**      | `/admin/statistics`           | Estadísticas avanzadas y gráficos globales                                                                              |
| **AdminMap**             | `/admin/map`                  | Mapa global completo con todos los datos                                                                                |
| **AdminGlobalView**      | `/admin/globalview`           | Vista general de reportes, tareas y progreso                                                                            |
| **RegistrationRequests** | `/admin/registrationrequests` | Aprobar/rechazar solicitudes de registro de operadores y trabajadores                                                   |
| **AdminProfileSearch**   | `/admin/profilesearch`        | Buscar y gestionar usuarios del sistema                                                                                 |
| **AdminProfile**         | `/admin/profile`              | Editar perfil personal                                                                                                  |

**Funcionalidades clave**:

- ✅ Aprobar/rechazar solicitudes de registro
- ✅ Gestionar todos los usuarios del sistema
- ✅ Estadísticas globales completas
- ✅ Mapa global con todos los datos
- ✅ Monitoreo del estado general del sistema
- ✅ Acceso completo a todos los módulos

---

## ⚙️ Funcionalidades Principales

### 🔐 Autenticación y Autorización

**Tecnología**: JWT (JSON Web Tokens)

**Flujo de autenticación**:

```
1. Usuario ingresa credenciales en /login
   ↓
2. React Hook Form valida con Zod (LoginSchema)
   ↓
3. POST a /auth/login con { username, password }
   ↓
4. Backend valida credenciales
   ↓
5. Backend retorna { token: "JWT..." }
   ↓
6. Frontend guarda token en localStorage
   ↓
7. Frontend decodifica JWT con jwt-decode
   ↓
8. Frontend actualiza UserContext con { _id, role, profile_picture }
   ↓
9. Redirección según rol:
   - Administrador → /admin/dashboard
   - Operador → /operator/dashboard
   - Trabajador → /worker/dashboard
   - Ciudadano → /citizen/dashboard
```

**Protección de rutas**:

- Cada Layout verifica el token en localStorage
- Si no hay token o es inválido → Redirección a /login
- UserContext provee datos del usuario a toda la app

---

### 📝 Gestión de Reportes

**Flujo completo**:

```
CIUDADANO (Crear)
   ↓
1. Completa formulario en /citizen/reports
   - Título (5-100 chars)
   - Descripción (10-500 chars)
   - Tipo (Bache, Alumbrado, Basura, Incidente, Otro)
   - Ubicación en mapa (lat, lng)
   - Imágenes (opcional, hasta 5, 15MB c/u)
   ↓
2. Validación con Zod (ReportSchema)
   ↓
3. FormData con datos + imágenes
   ↓
4. POST /report → Backend guarda reporte
   ↓
5. Estado inicial: "Pendiente"

OPERADOR (Gestionar)
   ↓
6. Ve reportes en /operator/reports
   ↓
7. Puede:
   - Revisar → Estado: "Revisado"
   - Aceptar → Estado: "Aceptado"
   - Rechazar → Estado: "Rechazado"
   ↓
8. Si acepta: puede crear tarea asociada

OPERADOR (Crear Tarea)
   ↓
9. Asigna tarea a cuadrilla en /operator/create-task
   ↓
10. Estado tarea: "Pendiente"

TRABAJADOR (Ejecutar)
   ↓
11. Ve tarea en /worker/tasks
   ↓
12. Acepta tarea → Estado: "En Progreso"
   ↓
13. Reporta avance en /worker/progress con imágenes
   ↓
14. Al finalizar → Estado tarea: "Finalizada"
   ↓
15. Estado reporte: "Completado"

CIUDADANO (Seguimiento)
   ↓
16. Ve progreso en /citizen/reportstatus
```

**Estados de reportes**:

- 🟡 **Pendiente**: Recién creado
- 🔵 **Revisado**: Operador lo revisó
- 🟢 **Aceptado**: Operador lo aceptó
- 🟣 **Completado**: Tarea finalizada
- 🔴 **Rechazado**: Operador lo rechazó

---

### 👥 Gestión de Cuadrillas y Tareas

**Operador crea cuadrilla**:

```
1. /operator/create-team
   ↓
2. Formulario con validación (CrewSchema):
   - Nombre (3-50 chars)
   - Líder (ID de trabajador)
   - Miembros (IDs separados por comas, opcional)
   ↓
3. POST /crew → Backend crea cuadrilla
```

**Operador asigna tarea**:

```
1. /operator/create-task
   ↓
2. Selecciona:
   - Reporte asociado (opcional)
   - Cuadrilla
   - Título, descripción, prioridad, tipo
   ↓
3. POST /task → Backend crea tarea
   ↓
4. Tarea aparece en /worker/tasks para la cuadrilla
```

**Trabajador reporta progreso**:

```
1. /worker/progress
   ↓
2. Selecciona tarea
   ↓
3. Completa:
   - Descripción de avance
   - Imágenes (hasta 5, 15MB c/u)
   ↓
4. POST /progress → Backend guarda reporte de progreso
   ↓
5. Operador ve en /operator/worker-progress
```

---

### 🗺️ Sistema de Mapas (Leaflet)

**Componentes de mapa**:

1. **CitizenLeafletMap**: Selección de ubicación para reportes
2. **GlobalLeafletMap**: Mapa completo con filtros (Operador/Admin)
3. **ReportLeafletMap**: Visualización de reportes

**GlobalLeafletMap - Características**:

```jsx
<GlobalLeafletMap role="Operador" />

Funcionalidades:
- ✅ Marcadores por tipo (Reporte, Tarea, Progreso)
- ✅ Iconos personalizados según tipo y estado
- ✅ Filtros dinámicos:
  * Tipo de dato (Reporte, Tarea, Progreso)
  * Estado (Pendiente, En Progreso, Completado, etc.)
  * Prioridad (Baja, Media, Alta)
  * Tiempo (1h, 6h, 12h, 24h, 7d, 1m, 3m, 6m, 1y)
- ✅ Panel de detalles al click
- ✅ Popup en hover
- ✅ Carga diferenciada por rol:
  * Operador: /map/operator-data (solo su área)
  * Admin: /map/data (todos los datos)
```

---

### 📊 Gráficos y Estadísticas

**Componentes de gráficos** (Chart.js):

1. **ChartBar**: Gráficos de barras
2. **ChartLine**: Gráficos de líneas (tendencias)
3. **ChartDoughnut**: Gráficos de dona (distribución)

**Uso en estadísticas**:

```jsx
// Ejemplo en OperatorStatistics
<ChartBar
  data={{
    labels: ["Ene", "Feb", "Mar", "Abr"],
    datasets: [
      {
        label: "Reportes",
        data: [10, 25, 15, 30],
        backgroundColor: "#3b82f6",
      },
    ],
  }}
/>
```

**Estadísticas disponibles**:

- Reportes por tipo
- Reportes por estado
- Tareas por prioridad
- Tendencias temporales
- Eficiencia del sistema
- Distribución geográfica

---

## 🔄 Flujos de Datos

### Patrón de Fetch Centralizado

**useFetch Hook** - Todas las peticiones HTTP:

```javascript
const {
  getFetchData, // GET con token
  postFetch, // POST sin token (login/register)
  postFetchLocalStorage, // POST con token (JSON)
  postFetchFormData, // POST con token (archivos)
  putFetch, // PUT con token y ID
  putFetchProfile, // PUT con token sin ID
  patchFetch, // PATCH con token
  deleteFetch, // DELETE con token y ID
  getByIdFetch, // GET con token y ID
} = useFetch();
```

**Ejemplo de uso**:

```javascript
// Obtener reportes
const reports = await getFetchData("/reports");

// Crear reporte con imágenes
const formData = new FormData();
formData.append("title", "Bache en calle");
formData.append("images", file1);
formData.append("images", file2);
await postFetchFormData("/report", formData);

// Actualizar estado
await putFetch("/report/status", reportId, { status: "Aceptado" });
```

---

### Sistema de Filtros

**useFilter Hook** - Filtrado avanzado:

```javascript
const {
  filterBySearch, // Búsqueda por texto
  filterReportsByStatus, // Filtrar reportes por estado
  filterReportsByType, // Filtrar reportes por tipo
  filterTasksByStatus, // Filtrar tareas por estado
  filterTasksByTaskType, // Filtrar tareas por tipo de tarea
  filterTasksByPriority, // Filtrar tareas por prioridad
  filterProgressByStatus, // Filtrar progreso por estado
  filterByTime, // Filtrar por rango de tiempo
  filterForMap, // Filtro combinado para mapas
  limitData, // Paginación
  sortData, // Ordenamiento
  applyFilters, // Encadenamiento de filtros
} = useFilter();
```

**Ejemplo en GlobalLeafletMap**:

```javascript
// Aplicar múltiples filtros
const filteredData = filterForMap(allData, {
  dataType: "report",
  status: "Pendiente",
  type: "Bache",
  timeRange: "24h",
});
```

---

## 🧩 Componentes Técnicos Clave

### ImageUploader

**Características**:

- ✅ Preview de imágenes antes de subir
- ✅ Validación de formato (jpg, png, gif, webp)
- ✅ Validación de tamaño (configurable, default 15MB)
- ✅ Validación de cantidad (configurable, default 5)
- ✅ Eliminación individual de imágenes
- ✅ UI responsive

**Props**:

```jsx
<ImageUploader
  onFilesChange={(files) => setSelectedImages(files)}
  maxFiles={5}
  maxSizeMB={15}
  resetImages={false}
/>
```

---

### FormRegister

**Componente reutilizable** para registro de:

- Ciudadanos (`/register`)
- Trabajadores (`/worker/register`)
- Operadores (`/operator/register`)
- Administradores (`/admin/register`)

**Validación completa** con RegisterSchema (Zod):

- Username (3-20 chars, alfanuméricos)
- Email (formato válido)
- Password (8-50 chars, mayúscula + minúscula + número)
- Nombre, apellido (2-50 chars, solo letras)
- DNI (8 dígitos)
- Teléfono (10 dígitos)
- Edad (18-100 años)
- Sexo (Hombre, Mujer, Otro)

---

## ✅ Validaciones y Reglas de Negocio

### Schemas de Validación (Zod)

#### LoginSchema

```javascript
{
  username: string (requerido),
  password: string (requerido)
}
```

#### RegisterSchema

```javascript
{
  username: string (3-20 chars, alfanuméricos),
  email: string (formato email),
  password: string (8-50 chars, mayúscula + minúscula + número),
  confirmpassword: string (debe coincidir),
  first_name: string (2-50 chars, solo letras),
  last_name: string (2-50 chars, solo letras),
  address: string (5-200 chars),
  age: number (18-100),
  dni: string (8 dígitos),
  sex: enum ["Hombre", "Mujer", "Otro"],
  phone: string (10 dígitos)
}
```

#### ReportSchema

```javascript
{
  title: string (5-100 chars),
  description: string (10-500 chars),
  type_report: string (requerido),
  other_type_detail: string (requerido si type_report === "Otro"),
  image: any (opcional)
}
```

#### TaskSchema

```javascript
{
  equipo: string (ObjectId de MongoDB, 24 chars hex)
}
```

#### CrewSchema

```javascript
{
  nombre: string (3-50 chars),
  lider: string (ObjectId de MongoDB),
  miembros: string (IDs separados por comas, opcional)
}
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 18+ y npm
- Backend MuniFor corriendo en `http://localhost:3000`

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/JoseFR2001/munifor-front-react.git

# 2. Navegar al directorio
cd munifor-front-react

# 3. Instalar dependencias
npm install
```

### Configuración del Backend

**Archivo**: `src/hooks/useFetch.js`

```javascript
// Línea 17
const hostPort = "http://localhost:3000/api";

// Para producción, cambiar a:
const hostPort = "https://tu-backend.com/api";
```

---

## 🛠️ Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo (puerto 5173)
npm run dev

# Compilar para producción
npm run build

# Vista previa de compilación
npm run preview

# Ejecutar linter
npm run lint
```

**URLs de desarrollo**:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## 🌐 Endpoints del Backend

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registro de ciudadanos

### Reportes

- `GET /api/reports` - Obtener reportes
- `POST /api/report` - Crear reporte (FormData)
- `GET /api/report/:id` - Obtener reporte por ID
- `PUT /api/report/:id` - Actualizar reporte
- `PUT /api/report/accept/:id` - Aceptar reporte
- `PUT /api/report/reject/:id` - Rechazar reporte
- `DELETE /api/report/:id` - Eliminar reporte (soft delete)

### Tareas

- `GET /api/tasks` - Obtener tareas
- `POST /api/task` - Crear tarea
- `GET /api/task/:id` - Obtener tarea por ID
- `PUT /api/task/:id` - Actualizar tarea
- `DELETE /api/task/:id` - Eliminar tarea
- `GET /api/task/worker` - Tareas del trabajador actual

### Cuadrillas

- `GET /api/crews` - Obtener cuadrillas
- `POST /api/crew` - Crear cuadrilla
- `GET /api/crew/:id` - Obtener cuadrilla por ID
- `PUT /api/crew/:id` - Actualizar cuadrilla
- `DELETE /api/crew/:id` - Eliminar cuadrilla

### Progreso

- `GET /api/progress` - Obtener reportes de progreso
- `POST /api/progress` - Crear reporte de progreso (FormData)
- `GET /api/progress/:id` - Obtener progreso por ID

### Dashboards

- `GET /api/dashboard/citizens` - Estadísticas ciudadano
- `GET /api/dashboard/workers` - Estadísticas trabajador
- `GET /api/dashboard/operators` - Estadísticas operador
- `GET /api/dashboard/admin` - Estadísticas administrador

### Mapas

- `GET /api/map/data` - Datos completos del mapa (Admin)
- `GET /api/map/operator-data` - Datos del mapa (Operador)

### Usuarios

- `GET /api/user/profile` - Obtener perfil actual
- `PUT /api/user/profile` - Actualizar perfil
- `GET /api/users` - Obtener todos los usuarios (Admin)
- `GET /api/user/:id` - Obtener usuario por ID

---

## 📚 Patrones de Diseño Utilizados

### 1. Component-Based Architecture

Separación clara entre presentación, lógica y estado.

### 2. Custom Hooks Pattern

Lógica reutilizable encapsulada en hooks (`useFetch`, `useFilter`).

### 3. Context API Pattern

Estado global compartido con `UserContext`.

### 4. Protected Routes Pattern

Layouts que verifican autenticación antes de renderizar.

### 5. Controlled Components Pattern

Formularios controlados con React Hook Form.

### 6. Schema Validation Pattern

Validación declarativa con Zod.

### 7. Composition Pattern

Componentes pequeños y reutilizables (`ImageUploader`, `InfoCard`, etc.).

---

## 🔒 Seguridad

### Medidas Implementadas

1. **JWT Authentication**: Token en localStorage con expiración
2. **Protected Routes**: Verificación de token en cada layout
3. **Role-Based Access**: Rutas específicas por rol
4. **Input Validation**: Zod schemas en frontend + backend
5. **File Upload Validation**: Formato y tamaño de imágenes
6. **XSS Protection**: React escapa HTML automáticamente
7. **CORS**: Configurado en backend

---

## 📱 Responsive Design

**Breakpoints de Tailwind**:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-first approach**: Todos los componentes son responsive.

---

## 🎨 Sistema de Diseño

### Colores Principales (Tailwind)

- **Primario**: Cyan (`cyan-700`, `cyan-600`, `cyan-500`)
- **Secundario**: Blue (`blue-700`, `blue-600`)
- **Estados**:
  - Pendiente: Yellow (`yellow-100`, `yellow-700`)
  - En Proceso: Blue (`blue-100`, `blue-700`)
  - Completado: Green (`green-100`, `green-700`)
  - Rechazado: Red (`red-100`, `red-700`)

### Tipografía

- **Font**: Sistema (sans-serif)
- **Títulos**: `text-4xl font-extrabold`
- **Subtítulos**: `text-2xl font-bold`
- **Texto**: `text-base`

---

## 🧪 Testing

**Estado actual**: No hay tests implementados

**Recomendaciones para testing**:

- Jest + React Testing Library
- Cypress para E2E
- MSW para mock de API

---

## 📈 Mejoras Futuras

### Técnicas

- [ ] Implementar tests unitarios y E2E
- [ ] Optimizar rendimiento con React.memo
- [ ] Implementar PWA (Progressive Web App)
- [ ] Añadir i18n (internacionalización)
- [ ] Implementar WebSockets para notificaciones en tiempo real
- [ ] Caché con React Query

### Funcionalidades

- [ ] Sistema de notificaciones push
- [ ] Chat en tiempo real entre roles
- [ ] Exportación de reportes a PDF
- [ ] Panel de analíticas avanzadas
- [ ] Sistema de valoración y comentarios
- [ ] Historial de actividad completo

---

## 👨‍💻 Equipo de Desarrollo

### Desarrolladores

Este proyecto ha sido desarrollado por estudiantes del **Instituto Politécnico Formosa** como parte de su formación académica:

- **Mendoza José** ([JoseFR2001](https://github.com/JoseFR2001))
  - Rol: Desarrollador Full Stack
  - Responsabilidades: Arquitectura del sistema, desarrollo backend y frontend, integración de APIs
- **Rodriguez Gonzalo** ([gonzalolrodriguez](https://github.com/gonzalolrodriguez))
  - Rol: Desarrollador Full Stack
  - Responsabilidades: Desarrollo de componentes, gestión de estado, implementación de mapas y gráficos

### Información del Proyecto

- **Institución**: Instituto Politécnico Formosa
- **Carrera**: Tecnicatura Superior en Desarrollo de Software Multiplataforma
- **Asignatura**: Prácticas Profesionales II
- **Año**: Primer año
- **Ciclo Lectivo**: 2025

### Repositorios del Proyecto

- **Frontend (React)**: [https://github.com/JoseFR2001/munifor-front-react](https://github.com/JoseFR2001/munifor-front-react)
- **Backend (Node.js)**: [https://github.com/JoseFR2001/munifor-back](https://github.com/JoseFR2001/munifor-back)

---

## 📄 Licencia

Este proyecto es de código abierto bajo la Licencia **ISC** y fue desarrollado con fines académicos.

### Uso del Proyecto

- ✅ Permitido para fines educativos
- ✅ Permitido para referencia técnica
- ✅ Permitido para adaptación y mejora
- ℹ️ Se agradece la atribución a los autores originales

---

## 🆘 Soporte

### Para Problemas Técnicos

1. **Revisa esta documentación completa**
2. **Verifica la consola del navegador** (F12 → Console)
3. **Verifica que el backend esté corriendo** en `http://localhost:3000`
4. **Revisa los logs del terminal** donde ejecutas `npm run dev`
5. **Consulta los Issues** en GitHub para problemas conocidos

### Contacto con los Desarrolladores

Para consultas académicas o técnicas sobre el proyecto:

- **GitHub Issues**: [Reportar un problema](https://github.com/JoseFR2001/munifor-front-react/issues)
- **Pull Requests**: Contribuciones son bienvenidas
- **Correo Institucional**: A través del Instituto Politécnico Formosa

### Recursos Adicionales

- 📚 [Documentación del Backend](https://github.com/JoseFR2001/munifor-back/blob/main/README.md)
- 📖 [React Documentation](https://react.dev/)
- 🗺️ [Leaflet Documentation](https://leafletjs.com/)
- 📊 [Chart.js Documentation](https://www.chartjs.org/)
- 🎨 [Tailwind CSS Documentation](https://tailwindcss.com/)

---

## 📝 Notas Técnicas Adicionales

### Gestión de Estado

**Estado Global (UserContext)**:

```javascript
{
  _id: string,              // ID del usuario
  role: string,             // Rol (Ciudadano, Trabajador, Operador, Administrador)
  profile_picture: string   // URL de imagen de perfil
}
```

**Estado Local**: Cada componente maneja su propio estado con `useState`

---

### Manejo de Imágenes

**Frontend**:

1. Usuario selecciona imágenes
2. ImageUploader valida formato y tamaño
3. Preview con `URL.createObjectURL()`
4. FormData con `formData.append('images', file)`

**Backend esperado**:

- Multer para procesamiento
- Guardado en carpeta `/uploads`
- Retorno de URLs en respuesta

---

### Optimizaciones de Rendimiento

1. **Lazy Loading**: Posible con `React.lazy()` (no implementado)
2. **Code Splitting**: Automático con Vite
3. **Tree Shaking**: Automático con Vite
4. **Minificación**: Automático en build
5. **Cleanup Effects**: Implementado con `isMounted` flags

---

---

## 🙏 Agradecimientos

### Institucionales

- **Instituto Politécnico Formosa**: Por brindar el espacio y los recursos para desarrollar este proyecto
- **Docentes de Prácticas Profesionales II**: Por la guía y supervisión durante el desarrollo
- **Comunidad Educativa**: Por el apoyo y feedback constructivo

### Técnicos

- **React Team**: Por la increíble biblioteca y ecosistema
- **Vite Team**: Por el build tool más rápido del mercado
- **Tailwind Labs**: Por revolucionar el desarrollo CSS
- **Leaflet Contributors**: Por los mapas interactivos de código abierto
- **Chart.js Team**: Por la biblioteca de gráficos más versátil
- **Comunidad Open Source**: Por todas las herramientas y librerías utilizadas

---

<div align="center">

### 🎓 Proyecto Académico - Instituto Politécnico Formosa

**Tecnicatura Superior en Desarrollo de Software Multiplataforma**

**Prácticas Profesionales II - Ciclo Lectivo 2025**

---

**⭐ Si este proyecto te fue útil para aprender o como referencia, considera darle una estrella en GitHub ⭐**

Desarrollado con ❤️ por estudiantes comprometidos con la excelencia técnica

**[Frontend Repository](https://github.com/JoseFR2001/munifor-front-react)** • **[Backend Repository](https://github.com/JoseFR2001/munifor-back)**

---

</div>
