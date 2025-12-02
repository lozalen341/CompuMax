# CompuMax – Backend

Backend de la aplicación web **CompuMax**, sistema de gestión de turnos para reparación de computadoras y dispositivos electrónicos.  
Se encarga de la lógica de negocio, control de usuarios, gestión de turnos y conexión con la base de datos.

---

##  Características Principales

###  Gestión de turnos
- Crear, editar, eliminar turnos.
- Actualizar el estado de los turnos: **Pendiente**, **En Proceso**, **Finalizado**.
- Filtrar turnos por estado, fecha o tipo de servicio.
- Control de visibilidad: los turnos finalizados se muestran al final de la lista.

###  Gestión de usuarios
- Crear, editar y eliminar usuarios.
- Autenticación y autorización por roles: **administrador** y **usuario**.
- Gestión de contraseñas seguras (hash + validación).

###  API REST
- Endpoints claros y documentados mediante Swagger/OpenAPI (`swagger.js`).
- Respuestas estandarizadas con códigos HTTP adecuados.
- Soporte para JSON y validación de entradas.

---

##  Arquitectura del Backend
```
api/
│
├── controllers/ # Controladores por entidad
│ ├── authController.js
│ ├── turnosController.js
│ ├── usuariosController.js
│
├── models/ # Modelos de datos
│ ├── Turno.js
│ ├── Usuario.js
│
├── routes/ # Definición de rutas
│ ├── authRoutes.js
│ ├── turnosRoutes.js
│ ├── usuariosRoutes.js
│
├── middleware/ # Middleware de validación y autenticación
│ ├── authMiddleware.js
│ ├── errorHandler.js
│
├── config/
│ ├── db.js # Conexión con la base de datos MySQL
│
└── swagger.js # Documentación de la API

```

---

##  Comunicación con la Base de Datos

- **Base de datos:** MySQL
- **Tablas principales:** `usuarios`, `turnos`, `servicios`, `roles`
- **Conexión:** mediante `config/db.js`
- **Operaciones:** CRUD completo sobre turnos y usuarios, con relaciones entre tablas para consistencia de datos.

---

##  Endpoints Principales

### Autenticación
- `POST /api/login` – Iniciar sesión
- `POST /api/register` – Crear usuario (administrador)

### Turnos
- `GET /api/turnos` – Listar todos los turnos (admin)
- `GET /api/turnos/:id` – Obtener turno específico
- `POST /api/turnos` – Crear turno
- `PUT /api/turnos/:id` – Editar turno
- `DELETE /api/turnos/:id` – Eliminar turno
- `POST /api/turnos/reservar` – Reservar turno (usuario)

### Usuarios
- `GET /api/usuarios` – Listar usuarios (admin)
- `GET /api/usuarios/:id` – Obtener usuario
- `PUT /api/usuarios/:id` – Editar usuario
- `DELETE /api/usuarios/:id` – Eliminar usuario

---

##  Instalación y Ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/lozalen341/CompuMax.git
cd CompuMax/api
```
Instalar dependencias:

```bash
Copiar código
npm install
```
Configurar archivo .env:
```bash
DB_HOST=localhost
DB_USER=usuario
DB_PASS=contraseña
DB_NAME=compumax
PORT=3000
JWT_SECRET=tu_secreto
```
Levantar el servidor:

```bash
Copiar código
npm start
```
Acceder a la documentación de la API:

```bash
Copiar código
http://localhost:3000/api-docs
```
###  Middleware y Seguridad

- Autenticación JWT: para proteger rutas privadas.

- Validación de entradas: asegurar que los datos enviados sean correctos.

- Manejo de errores centralizado: errorHandler.js devuelve mensajes claros y consistentes.

- Roles diferenciados: admin y usuario, para restringir funcionalidades.

###  Estructura de los Modelos

#### Usuario
- **id**
- **nombre**
- **email**
- **contraseña** (hashed)
- **rol** (administrador / usuario)

#### Turno
- **id**
- **usuario_id**
- **servicio**
- **fecha**
- **hora**
- **estado** (Pendiente / En Proceso / Finalizado)

#### Servicio
- **id**
- **nombre**
- **descripción**
- **precio**

---

###  Contribución

Para colaborar en el proyecto:

1. Hacer un fork del repositorio.
2. Crear una rama nueva con la funcionalidad:
```bash
git checkout -b feature-nueva
```
Hacer commit de los cambios:

```bash
Copiar código
git commit -m "Agregada nueva funcionalidad X"
```
Subir la rama y abrir un Pull Request.

#### Se valoran contribuciones que mejoren:

- Tests unitarios y de integración.

- Seguridad (hash de contraseñas, validaciones, protección de endpoints).

- Optimización de consultas a la base de datos.

### Autor
**Leandro Loza** – Desarrollador principal
