# AdoptApp

AdotpApp es una aplicación móvil desarrollada con React Native y JavaScript, diseñada para conectar a personas con mascotas en busca de un hogar. Nuestro objetivo es facilitar el proceso de adopción y promover el bienestar animal a través de una experiencia intuitiva y amigable.

## Estado del proyecto

AdotpApp está en desarrollo activo (versión beta). Estamos trabajando en nuevas funcionalidades y mejoras de rendimiento.

## Integración con Backend

AdoptApp se conecta a un backend personalizado desarrollado por nuestro equipo, **alojado en Railway** y expuesto mediante una **API REST**.  
La app tambien utiliza **Cloudinary** para el almacenamiento persistente de imágenes subidas por los usuarios (mascotas y servicios).

## Características principales

### Funcionalidades para usuarios
- Registro e inicio de sesión con persistencia (AsyncStorage)
- Vista de lista de mascotas disponibles para adopción
- Información detallada sobre cada mascota
- Formulario de solicitud de adopción vinculado al usuario
- Sistema de reserva y gestión de adopciones pendientes
- Vista de lista de servicios (veterinarios, paseadores, etc.)
- Detalles de cada servicio con ubicación
- Filtros por tipo de mascota y tipo de servicio
- Publicación de mascotas para adopción (con carga de imágenes)
- Publicación y edición de servicios por parte de usuarios
- Geolocalización del usuario y mapeo de servicios/mascotas
- Subida de imágenes desde galería o cámara

### Funcionalidades administrativas
- Roles diferenciados: usuario común y administrador
- Paneles de vision general de mascotas y servicios
- Gestión de usuarios y solicitudes de adopción

### Técnicas y de experiencia de usuario
- Navegación basada en archivos con *Expo Router*
- Estados de carga, errores y mensajes visuales por errores
- Integración con API REST personalizada


## Tecnologías utilizadas

### 📌 *Estructura base del stack tecnológico*

- *Frontend:* React Native con Expo
- *Backend:* API REST personalizada desarrollada por nuestro equipo alojada en Railway  
- *Routing:* Expo Router  
- *Autenticación:* AsyncStorage + Expo Local Authentication  
- *Estado global:* Context API  
- *Mapas:* Google Maps API + OpenCage Geocoding API
- **Ubicación geográfica** mediante Expo Location + OpenCage API
- **Carga de imágenes** desde cámara o galería con Expo Image Picker
- **Almacenamiento de imágenes:** Cloudinary
- *Diseño de pantallas:* componentes reutilizables (Cards, Inputs, Switch, Tabs)  



## Estructura del directorio

/assets/                   # Imágenes y recursos multimedia  
/src/  
  ├── app/                 # Navegación y pantallas principales de la app  
  │   ├── (adminTabs)/     # Pantallas de navegación para administradores (solicitudes, logout, mascotas)  
  │   ├── (tabs)/          # Pestañas de navegación principales para usuarios (maps, perfil, buscar, publicar, etc.)  
  │   ├── admin\usuarios/  # Vista y edición de perfiles de usuarios desde el panel de administración  
  │   ├── crear/           # Pantallas para crear mascotas y servicios  
  │   ├── formulario-adopcion/[mascotaId]/ # Formulario de solicitud de adopción para una mascota específica  
  │   ├── mascotas/        # Listado y gestión de mascotas (adoptadas, publicadas, solicitudes)  
  │   ├── servicios/       # Listado y edición de servicios, con vistas para admin y usuario  
  │   ├── editar-perfil.jsx  
  │   ├── index.jsx  
  │   ├── login.jsx  
  ├── components/          # Componentes reutilizables de UI (Cards, Inputs, Tabs, etc.)  
  ├── context/             # Contextos globales (como autenticación)  
  └── utils/               # Funciones utilitarias (formato, validaciones, helpers, etc.)  

## Permisos requeridos

La aplicación solicita los siguientes permisos:

- Acceso a la **ubicación del dispositivo** (para mascotas y servicios)
- Acceso a la **galería** (para seleccionar fotos del usuario o mascota)

## Cómo empezar

Asegúrate de tener Node.js y npm instalados. Sigue estos pasos para ejecutar la aplicación:

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/jjulianne/AdoptApp.git
   cd AdoptApp

2. **Instala las dependencias**

   ```bash
   npm install

3. **Ejecutar la AppPara iniciar el servidor de desarrollo Expo:**
   ```bash
   npm start
   
Se abrirá Expo DevTools en su navegador.
- Para iOS: Utilice la aplicación Expo Client en su dispositivo iOS o simulador. Escanee el código QR desde Expo DevTools.
- Para Android: Utilice la aplicación Expo Go en su dispositivo o emulador Android. Escanee el código QR desde la página de Expo DevTools.
