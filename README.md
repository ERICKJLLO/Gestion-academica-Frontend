# FocusLab — Frontend

Aplicación web para organizar períodos académicos, materias y materiales de estudio. Está desarrollada con Next.js (App Router), React, TypeScript y Tailwind CSS y consume la API de FocusLab.

## Enlaces

- [Frontend en Vercel](https://gestion-academica-frontend-psi.vercel.app)
- [Repositorio del frontend](https://github.com/ERICKJLLO/Gestion-academica-Frontend)
- [Repositorio del backend](https://github.com/MarioFer299/Gestion-academica-Back)
- [API en Render](https://gestion-academica-back-cgg8.onrender.com)

## Funcionalidades

- Registro, inicio y cierre de sesión con JWT.
- Rutas privadas y panel de administración restringido al rol `ADMIN`.
- Gestión de períodos académicos con fechas de inicio y finalización.
- Registro, consulta, edición y eliminación de materias asociadas a períodos.
- Biblioteca para subir, consultar, buscar, filtrar y eliminar materiales.
- Panel principal con resumen de materias, períodos y archivos.
- Estados de carga, error y listas vacías en las pantallas de gestión.

Las operaciones administrativas adicionales dependen de los endpoints que ofrezca el backend; el panel actual verifica el acceso por rol.

## Requisitos e instalación

Se necesita Node.js compatible con Next.js 15 (se recomienda Node.js 20 o superior), npm y acceso al backend.

```bash
git clone https://github.com/ERICKJLLO/Gestion-academica-Frontend.git
cd Gestion-academica-Frontend
npm ci
```

Crear `.env.local` en la raíz a partir de `.env.example`:

```env
NEXT_PUBLIC_API_HOST=http://localhost:4000
```

Si se utiliza el backend desplegado, cambiar el valor a `https://gestion-academica-back-cgg8.onrender.com` (sin `/api` al final).

```bash
npm run dev
```

Abrir `http://localhost:3000`.

**Importante:** el backend debe permitir el origen del frontend en CORS. `.env.local` no se sube a Git. Las credenciales de base de datos, JWT y almacenamiento pertenecen exclusivamente al backend.

## Verificación

```bash
npm run lint
npm run build
npm run format:check
```

`npm run lint` comprueba los tipos con TypeScript; `npm run format:check` revisa el formato con Prettier. Para ordenar el formato del frontend se puede ejecutar `npm run format`.

Prueba manual de integración con la API disponible:

1. Registrar un usuario e iniciar sesión.
2. Crear un período con sus fechas.
3. Crear una materia asociada al período y verificar que aparece el nombre del período.
4. Subir un PDF a la biblioteca, consultarlo y probar la búsqueda y los filtros.
5. Editar y eliminar registros de prueba, comprobando los mensajes y confirmaciones.
6. Cerrar sesión e intentar acceder directamente a una ruta privada.
7. Comprobar el menú, las tarjetas y los formularios en una pantalla pequeña.

## Organización del código

```text
app/                            Rutas y páginas de Next.js
src/features/auth/              Autenticación y protección de rutas
src/features/academic-periods/  Períodos académicos
src/features/subjects/          Materias
src/features/resources/         Biblioteca de archivos
src/features/common/            Componentes compartidos y cliente HTTP
```

Cada módulo organiza componentes, tipos, hooks y servicios. El cliente HTTP centralizado en `src/features/common/services/http.ts` agrega el token a las solicitudes autenticadas.

## Despliegue en Vercel

El frontend se despliega desde GitHub. En **Settings → Environment Variables** se configura:

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_API_HOST` | `https://gestion-academica-back-cgg8.onrender.com` |

Después de cambiar variables se debe volver a desplegar. El backend tiene que autorizar `https://gestion-academica-frontend-psi.vercel.app` en CORS. Que la página cargue no demuestra que la API funcione: es necesario probar registro, inicio de sesión y subida de archivos desde la URL pública.

## Integrantes

- **Jhon Erick Jaramillo Restrepo:** frontend, experiencia de usuario e integración con la API.
- **Mario:** backend, base de datos y almacenamiento de archivos.

Proyecto académico realizado en equipo.

## Cuentas de demostración

Antes de entregar, agregar aquí las credenciales **de prueba** creadas por el seed del backend: una cuenta `ADMIN` y una `USER`. Solicitarlas al responsable del backend. No publicar contraseñas personales ni credenciales de servicios.
