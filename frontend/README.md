# CompuMax – Frontend

Frontend de la aplicación web **CompuMax**, un sistema de gestión de turnos para una casa de reparación de computadoras y dispositivos electrónicos. Esta interfaz permite que usuarios y administradores interactúen fácilmente con el sistema: reservar turnos, gestionar información y visualizar estados en tiempo real.

---

##  Características Principales

###  Para usuarios
- Inicio de sesión.
- Selección del tipo de servicio de reparación.
- Visualización de días y horarios disponibles.
- Reserva de turnos.
- Panel donde pueden ver el estado de sus turnos (Pendiente / En Proceso / Finalizado).

###  Para el administrador
- Panel completo con control absoluto del sistema.
- Creación, edición y eliminación de turnos.
- Gestión de usuarios.
- Cambio de estado de los turnos.
- Lista dinámica que muestra turnos activos primero y finalizados al final.
- Visualización general del estado del negocio.

---

##  Arquitectura del Frontend

```
frontend/
└── assets/
├── css → Estilos del layout, sidebar, paneles y formularios
└── img → Logos, íconos, recursos gráficos

└── components/
├── Sidebar.jsx
├── Header.jsx
├── TurnosList.jsx
└── UserCard.jsx

└── pages/
├── Login.jsx
├── PanelAdmin.jsx
├── PanelUser.jsx
└── ReservarTurno.jsx

└── services/
├── authService.js
├── turnosService.js
└── usersService.js

main.jsx → Punto de entrada de React
index.html → Archivo base del frontend

```

Arquitectura modular, separada por responsabilidad:  
estilos, componentes reutilizables, páginas completas y servicios que manejan la comunicación con la API.

---

##  Interfaz y Diseño

- Sidebar fija para navegación rápida.  
- Panel administrativo con tarjetas, tablas y bloques por estados.  
- Panel del usuario orientado a reservas rápidas.  
- Layout responsivo y tipografía clara.  
- Estados de turnos con colores definidos:
  - **Pendiente:** amarillo  
  - **En Proceso:** azul  
  - **Finalizado:** verde  

---

##  Comunicación con el Backend

El frontend se comunica con la API mediante:
- Fetch o Axios.
- Tokens de autenticación JWT.
- Servicios separados dentro de `/services`.

---

##  Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/lozalen341/CompuMax.git
cd CompuMax/frontend
````
### 2. Instalar dependencias
```bash
npm install
```
### 3. Iniciar servidor de desarrollo
```bash
npm run dev
```
4. Acceder en el navegador
```arduino
http://localhost:5173
```
(El puerto puede variar.)

###  Responsividad
Diseñado para funcionar en:

- Desktop

- Tablets

- Smartphones

Utilizando flexbox, grid y media queries.

### Funcionalidades del Frontend

- Autenticación de usuarios.

- Diferenciación por rol.

- Formulario dinámico para reservas.

- Gestión visual del estado del turno.

- Listas filtradas y actualizadas.

- Navegación intuitiva.

- Validación de campos en cliente.

### Componentes Principales
- Sidebar.jsx: 
  - navegación entre Dashboard, Turnos, Usuarios y Configuración.

  - TurnosList.jsx: lista dinámica de turnos ordenados por estado y fecha.

  - ReservarTurno.jsx: formulario para elegir servicio, día y hora.

  - PanelAdmin.jsx: vista general con tarjetas, tablas y filtros.

### Contribución
Crear una rama nueva
```bash
git checkout -b feature-nueva
```
Guardar cambios
```bash
git commit -m "Agregada nueva funcionalidad X"
```
Subir la rama
```bash

git push origin feature-nueva
```
Luego abrir un Pull Request.

### Autor
**Leandro Loza** - Desarrollador principal
