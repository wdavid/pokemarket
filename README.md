# Pokémon Marketplace Pro

## Descripción general
**Pokémon Marketplace Pro** es una aplicación web de simulación de compras de Pokémon, donde los usuarios pueden iniciar sesión, visualizar un catálogo, filtrar, agregar al carrito y comprar Pokémon. Incluye roles (admin y comprador), manejo de stock y actualizaciones en tiempo real.

---

## 🚀 Tecnologías utilizadas

### Frontend:
- **Next.js 15.3.4**
- **React 19**
- **Tailwind CSS**
- **TypeScript**
- **Framer Motion**
- **React Icons / HeroIcons**
- **React Select / RC Slider**

### Backend simulado:
- **json-server** (API REST falsa)
- **socket.io** (Sockets en tiempo real)
- **Express** (Servidor de WebSockets)

### Otras herramientas:
- **PM2** (para procesos en segundo plano)
- **Concurrently** (para ejecutar múltiples scripts en paralelo)

---

## 🧪 Scripts disponibles

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
- `build`: genera la build optimizada
- `start`: arranca la app Next.js ya compilada
- `json-server`: simula una API REST leyendo desde `db.json`
- `socket-server`: ejecuta un servidor de WebSocket con `express` + `socket.io`
- `dev:all`: ejecuta simultáneamente `json-server`, `socket-server` y Next.js usando `concurrently`

---

## 🧱 Estructura del proyecto

```
.
├── app/                    # Rutas de la aplicación (Next.js App Router)
│   ├── 403/               # Página de acceso no autorizado
│   ├── admin/             # Vista del administrador
│   ├── auth/login/        # Página de inicio de sesión
│   ├── cart/              # Página del carrito de compras
│   └── layout.tsx         # Layout general de la app
├── components/            # Componentes reutilizables
├── context/               # Contextos globales (ej. usuario)
├── hooks/                 # Hooks personalizados
├── models/                # Modelos TypeScript (interfaces)
├── public/                # Archivos estáticos
├── services/              # Servicios para APIs y sockets
│   ├── authService.ts
│   ├── jsonServerService.ts
│   ├── pokemonService.ts
│   └── socketService.ts
├── utils/                 # Funciones utilitarias
├── db.json                # Base de datos simulada para `json-server`
├── .gitignore             # Archivos ignorados por git
├── eslint.config.mjs      # Configuración de ESLint
└── README.md              # Este archivo

```

---

## 🛠️ Cómo ejecutar localmente

```bash
git clone https://github.com/tu-usuario/pokemarket.git
cd pokemarket
npm install
npm run dev:all
```

---

## 🧠 Notas importantes

- `loginSimulado()` consulta la API falsa (`json-server`) para verificar usuario y contraseña.
- `socket.io` permite que se actualice el stock o carrito en tiempo real entre usuarios.
- El archivo `db.json` contiene la data de prueba con usuarios, pokémones y más.
- El servidor de sockets corre en el puerto **4000**.
- La API falsa corre en el puerto **3001**.
