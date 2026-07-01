# Documentación del Dashboard de Equipos

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js v16+
- PostgreSQL 12+
- npm o yarn

### Instalación Backend

```bash
cd server
npm install
cp .env.example .env
```

Edita `.env` con tus datos de conexión a PostgreSQL:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=equipment_dashboard
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
JWT_SECRET=your_secret_key
```

Ejecuta las migraciones:
```bash
npm run migrate
```

Inicia el servidor:
```bash
npm run dev
```

### Instalación Frontend

```bash
cd client
npm install
```

Crea `.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Inicia la aplicación:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📊 Funcionalidades

### Dashboard
- Estadísticas en tiempo real
- Visualización de equipos activos/inactivos
- Gráficos de mantenimiento por tipo
- Tasa de disponibilidad
- Costos de mantenimiento últimos 30 días

### Gestión de Equipos
- CRUD completo de equipos
- Especificaciones técnicas detalladas
- Categorización de equipos
- Historial de cambios

### Mantenimiento
- Registro de mantenimiento preventivo, correctivo y predictivo
- Estados: Programado, En Progreso, Completado
- Asignación de técnicos
- Registro de costos
- Notas y descripciones

### Importación de Datos
- Importar equipos desde Excel
- Validación automática
- Reporte de errores
- Soporte para especificaciones dinámicas

## 📁 Estructura de Base de Datos

### Tablas Principales

#### users
- Usuarios del sistema con roles (admin, manager, viewer)
- Autenticación JWT

#### equipment
- Información completa de equipos
- Estados: active, inactive, maintenance
- Metadatos: marca, modelo, serie, ubicación

#### equipment_specs
- Especificaciones técnicas flexibles
- Unidades personalizables

#### maintenance
- Registros de mantenimiento
- Tipos: preventivo, correctivo, predictivo
- Estados: scheduled, in_progress, completed

#### equipment_downtime
- Tiempo de inactividad por equipo
- Vinculado a registros de mantenimiento

## 🔐 Autenticación y Autorización

### Roles
- **Admin**: Acceso total
- **Manager**: Gestión de equipos y mantenimiento
- **Viewer**: Solo lectura

### JWT Token
Incluir en header: `Authorization: Bearer {token}`

## 📤 Formato de Importación Excel

Estructura esperada de columnas:

| code | name | brand | model | serial_number | location | category | spec_potencia | spec_capacidad | description |
|------|------|-------|-------|---------------|----------|----------|---------------|----------------|-------------|
| EQ001 | Equipo 1 | Marca A | Modelo X | SN123456 | Sala 1 | Categoría 1 | 5KW | 100L | Descripción |

**Columnas requeridas:** `code`, `name`
**Columnas opcionales:** Todas las demás
**Especificaciones:** Usar prefijo `spec_` para especificaciones dinámicas

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obtener usuario actual

### Equipos
- `GET /api/equipment` - Listar equipos
- `GET /api/equipment/:id` - Obtener equipo
- `POST /api/equipment` - Crear equipo
- `PUT /api/equipment/:id` - Actualizar equipo
- `DELETE /api/equipment/:id` - Eliminar equipo

### Mantenimiento
- `GET /api/maintenance` - Listar mantenimiento
- `POST /api/maintenance` - Crear mantenimiento
- `PUT /api/maintenance/:id` - Actualizar mantenimiento

### Analíticas
- `GET /api/analytics/stats` - Obtener estadísticas
- `GET /api/analytics/equipment/:id/history` - Historial de equipo

### Importación
- `POST /api/import/equipment` - Importar equipos desde Excel

## 🚀 Deployment

### Producción Backend
```bash
npm run build
npm start
```

### Producción Frontend
```bash
npm run build
# Servir archivos en /build
```

## 🛠️ Troubleshooting

### Error de conexión a BD
- Verificar que PostgreSQL esté corriendo
- Revisar credenciales en `.env`
- Verificar puerto 5432

### Token expirado
- Login nuevamente
- El token expira en 7 días por defecto

### Problemas con importación
- Verificar formato Excel
- Verificar columnas requeridas
- Revisar log de errores en la respuesta

## 📝 Próximas Mejoras
- [ ] Soporte para móviles optimizado
- [ ] Reportes PDF descargables
- [ ] Notificaciones de mantenimiento
- [ ] Predicción de fallos con ML
- [ ] API de integraciones externas
- [ ] Auditoría completa de cambios
