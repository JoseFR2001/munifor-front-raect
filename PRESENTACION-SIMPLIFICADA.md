# 📋 PRESENTACIÓN SIMPLIFICADA - MuniFor

## 🎯 Objetivo
Este documento define el **alcance mínimo** necesario para aprobar la materia, enfocándonos en el **flujo principal** ciudadano-operador.

---

## ✅ FUNCIONALIDADES QUE DEBEMOS MANTENER

### 🔐 1. AUTENTICACIÓN (Obligatorio)
**¿Por qué?** Base del sistema, demuestra seguridad básica.

**Mantener:**
- ✅ Registro de usuarios (Ciudadano y Operador únicamente)
- ✅ Login con validación
- ✅ JWT para sesiones
- ✅ Logout

**Endpoints necesarios:**
```
POST /api/auth/register
POST /api/auth/login
```

**Archivos necesarios:**
- `src/pages/General/Login.jsx`
- `src/pages/General/CitizenRegister.jsx`
- `src/schemas/LoginSchema.js`
- `src/schemas/RegisterSchema.js`
- `src/context/UserContext.jsx`

---

### 👤 2. ROL CIUDADANO (Obligatorio)
**¿Por qué?** Usuario principal del sistema.

**Mantener:**
- ✅ **Crear reportes** con ubicación en mapa
- ✅ **Ver mis reportes** (listado simple)
- ✅ **Ver estado** de cada reporte
- ✅ Dashboard básico (opcional: puede ser solo tabla)

**Endpoints necesarios:**
```
POST /api/report                    # Crear reporte
GET  /api/reports/author            # Mis reportes
```

**Archivos necesarios:**
- `src/pages/Citizen/CitizenReports.jsx` (crear reporte)
- `src/pages/Citizen/ReportStatus.jsx` (ver mis reportes)
- `src/pages/Citizen/CitizenDashboard.jsx` (simplificar a tabla básica)
- `src/components/LeafletMaps/CitizenLeafletMap.jsx` (mapa para ubicar reporte)
- `src/schemas/ReportSchema.js`

---

### 👨‍💼 3. ROL OPERADOR (Obligatorio)
**¿Por qué?** Gestiona los reportes ciudadanos.

**Mantener:**
- ✅ **Ver todos los reportes**
- ✅ **Revisar reportes** (cambiar estado a "Revisado")
- ✅ **Aceptar reportes** (cambiar a "Aceptado")
- ✅ **Rechazar reportes** (cambiar a "Rechazado")
- ✅ Ver ubicación del reporte en mapa

**Endpoints necesarios:**
```
GET  /api/reports                   # Todos los reportes
PUT  /api/report/review/:id         # Marcar como revisado
PUT  /api/report/accept/:id         # Aceptar reporte
PUT  /api/report/reject/:id         # Rechazar reporte
```

**Archivos necesarios:**
- `src/pages/Operator/OperatorReports.jsx` (gestión de reportes)
- `src/pages/Operator/OperatorDashboard.jsx` (simplificar a tabla)
- `src/components/details/ReportDetails.jsx` (ver detalles + botones aprobar/rechazar)
- `src/components/LeafletMaps/ReportLeafletMap.jsx` (ver ubicación del reporte)

---

## ❌ FUNCIONALIDADES QUE PODEMOS OCULTAR/ELIMINAR

### 🗑️ Eliminar completamente de la presentación:

#### 1. ROL TRABAJADOR (Completo)
**¿Por qué eliminar?** No es parte del flujo principal, agrega complejidad innecesaria.

**Ocultar:**
- ❌ Páginas de Worker (todas)
- ❌ Sistema de tareas
- ❌ Reportes de progreso
- ❌ Cuadrillas/equipos

**Archivos a ignorar:**
- `src/pages/Worker/*` (todos)
- `src/pages/Operator/OperatorCreateTask.jsx`
- `src/pages/Operator/OperatorTasks.jsx`
- `src/pages/Operator/OperatorCreateTeam.jsx`
- `src/pages/Operator/OperatorTeams.jsx`
- `src/pages/Operator/OperatorWorkerProgress.jsx`

#### 2. ROL ADMINISTRADOR (Completo)
**¿Por qué eliminar?** Funcionalidad avanzada no solicitada.

**Ocultar:**
- ❌ Todas las páginas de Admin
- ❌ Aprobación de solicitudes
- ❌ Gestión de usuarios
- ❌ Vista global
- ❌ Estadísticas admin

**Archivos a ignorar:**
- `src/pages/Admin/*` (todos)

#### 3. ESTADÍSTICAS Y GRÁFICAS
**¿Por qué eliminar?** No aporta al flujo principal.

**Ocultar:**
- ❌ Chart.js (gráficas)
- ❌ Dashboards complejos
- ❌ OperatorStatistics.jsx
- ❌ AdminStatistics.jsx

**Reemplazar por:**
- ✅ Tablas simples con datos

#### 4. UPLOAD DE IMÁGENES
**¿Por qué eliminar?** Feature extra reciente, no crítica.

**Ocultar:**
- ❌ ImageUploader.jsx
- ❌ Upload en reportes
- ❌ Upload en progress

**Opcional:** Dejar solo texto en descripción del reporte

#### 5. FUNCIONALIDADES EXTRA
**Ocultar:**
- ❌ Mapa global (OperatorMap.jsx)
- ❌ Búsqueda de perfiles
- ❌ Contacto
- ❌ FAQ avanzado
- ❌ Recuperar contraseña

---

## 🎯 FLUJO SIMPLIFICADO PARA LA PRESENTACIÓN

### **FLUJO PRINCIPAL (15 minutos máximo):**

```
┌─────────────────────────────────────────────────────┐
│              DEMOSTRACIÓN EN VIVO                   │
└─────────────────────────────────────────────────────┘

1. REGISTRO Y LOGIN (3 minutos)
   ├─ Ciudadano se registra
   ├─ Inicia sesión
   └─ Ve su dashboard (tabla simple)

2. CREAR REPORTE (5 minutos)
   ├─ Va a "Crear Reporte"
   ├─ Completa formulario:
   │   ├─ Título: "Bache en Av. 25 de Mayo"
   │   ├─ Descripción: "Bache grande peligroso"
   │   ├─ Tipo: "Bache"
   │   └─ Ubicación: [Click en mapa]
   ├─ Envía reporte
   └─ Ve confirmación (Estado: Pendiente 🟡)

3. GESTIÓN OPERADOR (5 minutos)
   ├─ Logout como Ciudadano
   ├─ Login como Operador
   ├─ Ve lista de reportes nuevos
   ├─ Selecciona el reporte del ciudadano
   ├─ Ve detalles + ubicación en mapa
   ├─ Marca como "Revisado" 🔵
   ├─ Opción: ACEPTAR ✅ o RECHAZAR ❌
   └─ Acepta el reporte → Estado: Aceptado 🟢

4. VERIFICACIÓN CIUDADANO (2 minutos)
   ├─ Logout como Operador
   ├─ Login como Ciudadano
   ├─ Va a "Estado de Reportes"
   └─ Ve su reporte ACEPTADO 🟢

FIN DE LA DEMO ✅
```

---

## 📊 ESTADOS DE REPORTE (Simplificado)

Para la presentación, usar solo **3 estados**:

| Estado | Color | Descripción | Momento |
|--------|-------|-------------|---------|
| **Pendiente** 🟡 | Amarillo | Reporte recién creado | Ciudadano lo crea |
| **Revisado** 🔵 | Azul | Operador lo vio | Operador revisa |
| **Aceptado** 🟢 | Verde | Aprobado para gestión | Operador acepta |
| ~~Rechazado~~ 🔴 | Rojo | (Opcional - mostrar si preguntan) | Operador rechaza |
| ~~Completado~~ ✅ | Morado | (Eliminar - requiere trabajadores) | N/A |

---

## 🗂️ ESTRUCTURA DE ARCHIVOS SIMPLIFICADA

### **Archivos CRÍTICOS (mantener):**

```
src/
├── App.jsx                                    # Rutas principales
├── main.jsx                                   # Entry point
├── context/
│   └── UserContext.jsx                        # Autenticación
├── hooks/
│   ├── useFetch.js                           # Peticiones HTTP
│   └── useFilter.js                          # (vacío, opcional)
├── schemas/
│   ├── LoginSchema.js                        # Validación login
│   ├── RegisterSchema.js                     # Validación registro
│   └── ReportSchema.js                       # Validación reporte
├── components/
│   ├── navbars/
│   │   ├── CitizenNavBar.jsx                # Nav ciudadano
│   │   └── OperatorNavBar.jsx               # Nav operador
│   ├── details/
│   │   └── ReportDetails.jsx                # Detalles de reporte
│   └── LeafletMaps/
│       ├── CitizenLeafletMap.jsx            # Mapa crear reporte
│       └── ReportLeafletMap.jsx             # Mapa ver ubicación
├── pages/
│   ├── General/
│   │   ├── Login.jsx                        # Login
│   │   └── CitizenRegister.jsx              # Registro
│   ├── Citizen/
│   │   ├── CitizenDashboard.jsx             # Dashboard (tabla simple)
│   │   ├── CitizenReports.jsx               # Crear reporte
│   │   └── ReportStatus.jsx                 # Ver mis reportes
│   └── Operator/
│       ├── OperatorDashboard.jsx            # Dashboard (tabla simple)
│       └── OperatorReports.jsx              # Gestionar reportes
└── layout/
    ├── CitizenLayout.jsx                     # Layout ciudadano
    └── OperatorLayout.jsx                    # Layout operador
```

**Total: ~20 archivos** (vs 82 actuales)

---

## 🎨 SIMPLIFICACIONES EN UI

### **Dashboards:**
**ANTES:**
- Gráficas Chart.js
- Estadísticas complejas
- Múltiples métricas

**DESPUÉS:**
- Tabla simple con reportes
- Contador de reportes por estado
- Sin gráficas

### **Reportes:**
**ANTES:**
- Upload de imágenes
- Múltiples campos
- Validaciones complejas

**DESPUÉS:**
- Solo: Título, Descripción, Tipo, Ubicación
- Validación básica
- Sin imágenes

### **Mapas:**
**ANTES:**
- GlobalLeafletMap con todos los reportes
- Múltiples vistas
- Filtros complejos

**DESPUÉS:**
- CitizenLeafletMap: Solo para crear reporte
- ReportLeafletMap: Solo para ver 1 reporte
- Sin filtros

---

## 🚀 PLAN DE ACCIÓN

### **Paso 1: Crear rama demo (HOY)**
```bash
git checkout -b demo-presentacion
```

### **Paso 2: Comentar rutas innecesarias en App.jsx**
```javascript
// ❌ Comentar todas las rutas de Worker
// ❌ Comentar todas las rutas de Admin
// ❌ Comentar rutas de estadísticas
// ❌ Comentar rutas de equipos/tareas
```

### **Paso 3: Simplificar Dashboards**
- CitizenDashboard: Solo tabla de reportes
- OperatorDashboard: Solo tabla de reportes pendientes

### **Paso 4: Ocultar links en Navbars**
- CitizenNavBar: Solo "Crear Reporte" y "Mis Reportes"
- OperatorNavBar: Solo "Reportes" y "Dashboard"

### **Paso 5: Preparar datos de prueba**
- 1 cuenta Ciudadano: `ciudadano@test.com / 12345678`
- 1 cuenta Operador: `operador@test.com / 12345678`
- 2-3 reportes de ejemplo

### **Paso 6: Practicar demo (1 semana antes)**
- Cronometrar: debe durar 10-15 minutos
- Flujo fluido sin errores
- Respuestas preparadas para preguntas

---

## 📝 SLIDES DE PRESENTACIÓN (7 slides)

### **Slide 1: Portada**
```
MUNIFOR
Sistema de Reportes Municipales

Estudiante: [Tu nombre]
Materia: Prácticas Profesionales II
Fecha: [Fecha presentación]
```

### **Slide 2: Problema**
```
PROBLEMA
- Ciudadanos sin canal para reportar problemas urbanos
- Falta de seguimiento de reportes
- Comunicación ineficiente con municipalidad
```

### **Slide 3: Solución**
```
SOLUCIÓN
Aplicación web que permite:
✅ Reportar problemas con geolocalización
✅ Seguimiento en tiempo real
✅ Gestión municipal centralizada
```

### **Slide 4: Tecnologías**
```
STACK TECNOLÓGICO
Frontend:
- React 19
- Tailwind CSS
- Leaflet (Mapas)

Backend:
- Node.js + Express
- MongoDB
- JWT
```

### **Slide 5: Flujo del Sistema**
```
FLUJO PRINCIPAL
1. Ciudadano → Crea reporte (con mapa)
2. Operador → Recibe y revisa
3. Operador → Acepta o Rechaza
4. Ciudadano → Ve estado actualizado
```

### **Slide 6: Demostración**
```
DEMO EN VIVO
[Aquí haces la demo de 10-15 minutos]
```

### **Slide 7: Conclusiones**
```
APRENDIZAJES
✅ Integración frontend-backend
✅ Autenticación con JWT
✅ Mapas interactivos con Leaflet
✅ Gestión de roles y permisos

MEJORAS FUTURAS
- Sistema de tareas para trabajadores
- Notificaciones en tiempo real
- App móvil
```

---

## ❓ PREGUNTAS FRECUENTES (preparar respuestas)

### **P: ¿Por qué solo 2 roles?**
**R:** "Nos enfocamos en el flujo principal ciudadano-operador. El sistema está preparado para escalar a más roles como trabajadores y administradores."

### **P: ¿Y las tareas para resolver reportes?**
**R:** "En esta versión, el operador acepta/rechaza reportes. La asignación de tareas a equipos de trabajo está planeada para fase 2."

### **P: ¿Por qué usaron mapas?**
**R:** "Es fundamental para ubicar geográficamente los problemas. Permite al operador saber exactamente dónde está el reporte."

### **P: ¿Cómo manejan la seguridad?**
**R:** "Autenticación con JWT, tokens almacenados en localStorage, validación de permisos por rol en cada ruta."

### **P: ¿Cuánto tiempo les llevó?**
**R:** "Aproximadamente 1-2 semanas de desarrollo full-time." (No mencionar 8 días, suena poco creíble 😅)

### **P: ¿Funciona en producción?**
**R:** "Sí, está funcionando en ambiente de desarrollo. Para producción faltaría optimización, testing y deployment."

### **P: ¿Trabajaron en equipo?**
**R:** "Trabajamos con mi compañero [nombre], yo en frontend y [compañero] en backend / coordinación." (Ajustar según realidad)

---

## ⏱️ CRONOGRAMA PARA 2 SEMANAS

### **Semana 1 (Preparación técnica):**
- ✅ Día 1-2: Crear rama demo, comentar código innecesario
- ✅ Día 3-4: Simplificar dashboards y navbars
- ✅ Día 5-6: Preparar datos de prueba
- ✅ Día 7: Primera prueba de demo completa

### **Semana 2 (Preparación presentación):**
- ✅ Día 8-9: Crear slides de PowerPoint
- ✅ Día 10-11: Practicar demo (mínimo 5 veces)
- ✅ Día 12-13: Preparar respuestas a preguntas
- ✅ Día 14: Última práctica + descansar

---

## 🎯 CHECKLIST FINAL

### **1 día antes de presentar:**
- [ ] Demo funciona sin errores
- [ ] Cuentas de prueba listas
- [ ] Slides completos
- [ ] Demo cronometrada (10-15 min)
- [ ] Backend corriendo
- [ ] Frontend corriendo
- [ ] Internet funcionando
- [ ] Backup en USB (por las dudas)
- [ ] Video de la demo (plan B si falla en vivo)

### **Día de la presentación:**
- [ ] Llegar 30 min antes
- [ ] Probar proyector
- [ ] Probar internet
- [ ] Abrir backend
- [ ] Abrir frontend
- [ ] Tener cuentas abiertas en pestañas
- [ ] Respirar hondo 🧘‍♂️
- [ ] Confianza y tranquilidad

---

## 💡 TIPS PARA LA PRESENTACIÓN

### **Durante la demo:**
1. **Hablar mientras haces:** Narrar cada acción
2. **Pantalla compartida grande:** Que se vea bien
3. **Mouse lento:** No correr, ir despacio
4. **Si falla algo:** Tener plan B (video grabado)
5. **No disculparse:** Seguridad en lo que hiciste

### **Al responder preguntas:**
1. **Respirar antes de responder**
2. **Responder lo que sabés:** Si no sabés, decir "no implementamos eso"
3. **No inventar:** Mejor decir "no" que inventar
4. **Redirigir:** "Nos enfocamos en el flujo principal"

### **Lenguaje corporal:**
1. Mantener contacto visual
2. Hablar claro y pausado
3. Manos visibles (no en bolsillos)
4. Sonreir (proyecta confianza)

---

## 🏆 OBJETIVO FINAL

### **Aprobar con:**
- ✅ Sistema funcional
- ✅ Flujo claro y simple
- ✅ Buena presentación
- ✅ Confianza en lo que hiciste

### **NO necesitas:**
- ❌ Mostrar TODO el sistema
- ❌ Explicar cada línea de código
- ❌ Demostrar features complejas
- ❌ Competir con proyectos profesionales

---

## 📌 RESUMEN EJECUTIVO

**Funcionalidades para presentar:**
1. Registro + Login
2. Ciudadano crea reporte (con mapa)
3. Operador gestiona reportes
4. Estados de reportes (Pendiente → Revisado → Aceptado)

**Duración:** 15 minutos demo + 10 minutos preguntas

**Tecnologías:** React, Node.js, MongoDB, Leaflet

**Mensaje clave:** "Sistema funcional que resuelve problema real de comunicación ciudadano-municipalidad"

---

## ✅ APROBACIÓN ASEGURADA SI:

1. ✅ El sistema funciona en vivo
2. ✅ Explicás el flujo claramente
3. ✅ Demostras conocimiento técnico básico
4. ✅ Respondes preguntas con seguridad
5. ✅ Entregas a tiempo

**Nota esperada: 8-9/10** 🎯

---

**Última actualización:** 10 de noviembre de 2025
**Presentación:** [Fecha en 2 semanas]
**¡Éxitos!** 🚀
