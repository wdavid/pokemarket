# Pokémon Marketplace Pro

**Pokémon Marketplace Pro** es una aplicación web de simulación de compras de Pokémon, donde los usuarios pueden iniciar sesión, visualizar un catálogo, filtrar, agregar al carrito y comprar Pokémon. Incluye autenticación simulada, manejo de stock y actualizaciones en tiempo real mediante WebSockets.

---

## 🚀 Tecnologías utilizadas

### 🧩 Frontend
- **Next.js 15.3.4**
- **React 19**
- **Tailwind CSS**
- **TypeScript**
- **Framer Motion**
- **React Icons / HeroIcons**
- **React Select / RC Slider**

### 🛠 Backend simulado
- **json-server** (API REST falsa)
- **socket.io** (Sockets en tiempo real)
- **Express** (Servidor de WebSockets)

### ⚙️ Utilidades
- **PM2** (procesos en segundo plano)
- **Concurrently** (scripts paralelos)
- **ESLint + TypeScript**

---

## 👥 Usuarios de prueba

Puedes iniciar sesión con las siguientes credenciales:

| Rol     | Usuario   | Contraseña   |
|---------|-----------|--------------|
| Admin   | `admin`   | `admin123`   |
| Cliente | `cliente` | `cliente123` |

Estos usuarios están definidos en `db.json`.

---

## 🛠️ Scripts disponibles

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "json-server": "json-server --watch db.json --port 3001",
  "socket-server": "node socketServer.js",
  "dev:all": "concurrently \"npm run json-server\" \"npm run socket-server\" \"npm run dev\""
}
```

- `dev`: inicia Next.js en modo desarrollo
- `build`: genera la build de producción
- `start`: ejecuta la build optimizada
- `json-server`: inicia la API REST falsa
- `socket-server`: inicia el servidor WebSocket en el puerto `4000`
- `dev:all`: ejecuta todo lo anterior simultáneamente

---

## 🧱 Estructura del proyecto

```
pokemon-marketplace-pro/
├── app/
│   ├── 403/              # Página de acceso denegado
│   ├── admin/            # Panel de administración
│   ├── auth/login/       # Inicio de sesión
│   ├── cart/             # Carrito de compras
│   ├── layout.tsx        # Layout global
│   └── page.tsx          # Página principal
├── components/           # Componentes reutilizables
├── context/              # Manejo de estado global (usuario)
├── hooks/                # Hooks personalizados
├── models/               # Interfaces TypeScript
├── public/               # Recursos estáticos
├── services/
│   ├── authService.ts        # Lógica de autenticación simulada
│   ├── jsonServerService.ts # Acceso a la API simulada
│   ├── pokemonService.ts     # Servicios de Pokémon
│   └── socketService.ts      # Comunicación en tiempo real
├── utils/                # Funciones auxiliares
├── db.json               # Base de datos JSON falsa
├── eslint.config.mjs     # Configuración de linting
└── README.md             # Este documento
```

---

## ⚙️ Cómo ejecutar localmente

```bash
git clone https://github.com/wdavid/pokemarket.git
cd pokemarket
npm install
npm run dev:all
```

Esto levanta:
- Cliente: `http://localhost:3000`
- API falsa (json-server): `http://localhost:3001`
- WebSocket: `http://localhost:4000`

---

## 🔒 Autenticación simulada

La función `loginSimulado()` consulta `json-server` para verificar las credenciales contra los datos en `db.json`. Si coinciden, retorna un objeto con `success` y un `token` falso.

---

## 🧠 Notas adicionales

- `socket.io` permite que el stock se sincronice entre usuarios/admin.
- En modo producción, puedes usar `pm2` para mantener procesos vivos:
  
```bash
npm run build
pm2 start "npm run start" --name pokemarket-prod
pm2 start socketServer.js --name socket-server
pm2 start "npx json-server --watch db.json --port 3001" --interpreter bash --name json-server
pm2 save
pm2 startup
```
