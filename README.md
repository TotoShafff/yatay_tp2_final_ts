# API RESTful - Gestión de Stock de Productos

API desarrollada para el final de TP2 para gestionar productos (stock) con persistencia en MongoDB Atlas.

## Requisitos Previos

- Node.js v16 o superior
- Cuenta en MongoDB Atlas (plan free)
- npm

## Instalación

1. Clonar el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd TP2_FINAL_SUCKEWER
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno

## Configuración de Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
NODE_ENV=development

DB_PROVIDER=mongo
MONGODB_URL=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<database>?appName=<app>

API_KEY=tu-api-key-secreta
JWT_SECRET=tu-jwt-secret-seguro
JWT_EXPIRATION=24h
```

Reemplazar:
- `<usuario>`: Usuario de MongoDB Atlas
- `<password>`: Contraseña del usuario
- `<cluster>`: URL del cluster
- `<database>`: Nombre de la base de datos (ej: stockDB)
- `API_KEY`: Clave para autenticación con x-api-key
- `JWT_SECRET`: Secreto para firmar tokens JWT

## Levantar el Proyecto en Modo MongoDB

Este proyecto está configurado para usar MongoDB Atlas por defecto mediante la variable `DB_PROVIDER=mongo` en el `.env`.

### Modo producción:
```bash
npm start
```

### Modo desarrollo (con auto-reload):
```bash
npm run dev
```

El servidor:
1. Se conectará automáticamente a MongoDB Atlas usando la URL configurada en `MONGODB_URL`
2. Estará disponible en `http://localhost:3000`
3. La consola mostrará: "MongoDB conectado correctamente" si la conexión fue exitosa

## Endpoints Disponibles

### Productos (CRUD)

Método | Ruta | Autenticación | Descripción

POST | `/api/v1/productos` | No | Crear producto
GET | `/api/v1/productos` | No | Listar productos
GET | `/api/v1/productos/:id` | No | Obtener producto por ID
PUT | `/api/v1/productos/:id` | Sí | Actualizar producto
DELETE | `/api/v1/productos/:id` | Sí | Eliminar producto

### Albums CSV

Método | Ruta | Autenticación | Descripción

GET | `/api/v1/albums/csv` | No | Generar y descargar CSV de albums

## Autenticación

Los endpoints PUT y DELETE requieren autenticación mediante:

### Opción 1: API Key (x-api-key)
```
x-api-key: tu-api-key-secreta
```

### Opción 2: JWT Bearer Token
```
Authorization: Bearer <token>
```

Para generar un token JWT de prueba:
1. Ir a https://jwt.io
2. Usar el algoritmo HS256
3. En el payload, agregar datos de ejemplo: `{ "userId": 1 }`
4. En "Verify Signature", usar el valor de `JWT_SECRET` del .env
5. Copiar el token generado

## Ejecutar Tests

Los tests están en formato REST Client (utlizando la extensión del IDE).

1. Instalar la extensión "REST Client" en VSCode para que sea mucho más facil
2. Abrir el archivo `tests/test.endpoints.http`
3. Actualizar las variables en la parte superior si es necesario
4. Hacer click en "Send Request" sobre cada test

El archivo incluye:
- Tests de creación de productos
- Tests de listado y obtención
- Tests de actualización y eliminación (con y sin auth)
- Tests de validaciones y errores
- Test de generación de CSV

## Estructura del Proyecto

```
proyecto-stock-api/
├── app.js                      # Configuración de Express
├── index.js                    # Punto de entrada
├── config/
│   └── index.js                # Variables de entorno
├── controllers/
│   └── productoController.js   # Controlador de productos
├── models/
│   └── producto.js             # Schema de Mongoose
├── repository/
│   └── productoRepositoryMongo.js # Acceso a datos (MongoDB)
├── routes/
│   └── productoRoutes.js       # Rutas de productos
├── services/
│   ├── albumsService.js        # Lógica de albums/CSV
│   └── productoService.js      # Lógica de negocio de productos
├── middlewares/
│   └── authMiddleware.js       # Middleware de autenticación
├── database/
│   ├── conexiones/
│   │   └── mongoConnection.js  # Conexión a MongoDB
│   └── albums_15.csv           # CSV generado (se crea al consumir endpoint)
├── tests/
│   └── test.endpoints.http     # Tests REST Client
├── .env                        # Variables de entorno (no commitear)
├── .gitignore
├── package.json
└── README.md
```

## Formato de Errores

Todas las respuestas de error siguen el formato:

```json
{
  "statusCode": 400,
  "error": "Mensaje descriptivo del error"
}
```

## Validaciones del Modelo Producto

- `producto`: String requerido, no puede estar vacío
- `stockAmount`: Entero requerido, mayor o igual a 0
- `fechaIngreso`: String en formato YYYY-MM-DD (opcional, por defecto fecha actual)

## Base de Datos

El proyecto usa MongoDB Atlas como base de datos. La conexión se configura mediante la variable `MONGODB_URL` en el `.env`.

Al iniciar el servidor, automáticamente se conecta a MongoDB. Si la base de datos no existe, se crea automáticamente.

## Autor

Tobias Suckewer - TP2 ORT

