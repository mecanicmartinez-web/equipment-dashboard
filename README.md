# Equipment Dashboard

Sistema de gestión integral de equipos con seguimiento de mantenimiento, estadísticas y análisis en tiempo real.

## 🎯 Características

- **Gestión de Equipos**: Registro completo de equipos con especificaciones técnicas
- **Mantenimiento**: Seguimiento de mantenimiento preventivo, correctivo y predictivo
- **Estadísticas**: Tasa de disponibilidad, equipos en mantenimiento, análisis de costos
- **Gráficos e Informes**: Visualización de datos con Recharts
- **Multi-usuario**: Acceso para múltiples usuarios con autenticación
- **Importación Excel**: Carga masiva de datos desde archivos Excel
- **Responsive**: Interfaz adaptable (móvil a futuro)

## 🏗️ Stack Tecnológico

### Backend
- Node.js + Express + TypeScript
- PostgreSQL para base de datos
- JWT para autenticación
- Multer para manejo de archivos
- XLSX para procesamiento de Excel

### Frontend
- React + TypeScript
- Ant Design para UI
- Recharts para gráficos
- Axios para API calls

## 📁 Estructura del Proyecto

```
equipment-dashboard/
├── server/                 # Backend Node.js
├── client/                 # Frontend React
├── docs/                   # Documentación
└── README.md
```

## 🚀 Instalación Rápida

### Backend
```bash
cd server
npm install
cp .env.example .env
npm run migrate
npm run dev:server
```

### Frontend
```bash
cd client
npm install
npm start
```

## 📊 Base de Datos

### Tablas Principales
- `users` - Usuarios del sistema
- `equipment` - Información de equipos
- `maintenance` - Registros de mantenimiento
- `maintenance_types` - Tipos de mantenimiento
- `equipment_specs` - Especificaciones técnicas
- `analytics` - Cache de estadísticas

## 🔐 Autenticación

Autenticación JWT con roles:
- Admin - Acceso total
- Manager - Gestión de equipos y mantenimiento
- Viewer - Solo lectura

## 📥 Importación de Datos

Sistema de importación de Excel con validación automática de datos.

## 📄 Licencia

MIT

## 👨‍💻 Autor

mecanicmartinez-web
