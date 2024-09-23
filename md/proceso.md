# Proceso

## 1. Migración `backend-express/prisma` -> `backend-express/infrastructure/prisma`
### Objetivo principal
Mover la carpeta de `prisma` de `backend-express` a `backend-express/infrastructure`, para tener mas consistencia en la estructura hexagonal.
### Detalles
#### Añadir/modificar output en `schema.prisma`
- Indicar en el generador del archivo `schema.prisma` donde esta "ubicado" el `@prisma/client`. Para ello debemos apuntar a nuestro `node_modules`, pero en vez de apuntar como: `...node_modules/@prisma/client` debemos apuntar indicando `.prisma/client`, para evitar el siguiente warning:
    ![warning @prisma/client](./img/warning-prisma-client.png)
- Para este ejemplo quedara así:
    ![imagen schema.prisma updated](./img/schemas.prisma-root-updated.png)

#### Generar y migrar Prisma apuntando a la nueva ruta
- Apuntar a la nueva ruta a la hora de ejecutar comandos "Prisma", para ello, utilizaremos la bandera `--schema`.

## 2. Migrate `infrastructure`
### Objetivo principal
Mover la carpeta de `infrastructure` de `./backend-express` a `./` (o ruta raíz). Al realizar esto, se obtiene una consistencia total en la arquitectura hexagonal, al cada parte ser independiente de la otra. 

Para ello, infrastructure tiene sus propios `node_modules`, los cuales, son completamente independientes del backend o interface, los cuales mantendrán la lógica del backend exclusivamente.

### Detalles
#### Desinstalar paquetes usados para la infrastructure en el backend
- Desinstalar los paquetes/módulos que utilize la infrastructure, los cuales no debe utilizar el backend, utiliza la propiedad `uninstall` de npm o de su empaquetador preferido.
    - Para este ejemplo puedes utilizar los siguientes comandos:
        ```bash
            npm uninstall @prisma/client
            npm uninstall -D prisma
        ```
#### Traspasar infrastructure a la raíz
- Mover la carpeta `infrastructure` de `./backend-express` a `./` (o ruta raíz).
- A continuación, podemos volver a instalar las dependencias pero esta vez en la carpeta `infrastructure`.
    - En este ejemplo, lo haremos a traves del archivo `package.json`, el cual vamos a crear en la carpeta `infrastructure` con el siguiente código:
        ```json
        {
            "name": "infrastructure",
            "version": "1.0.0",
            "scripts": {
                
            },
            "dependencies": {
            "@prisma/client": "^5.19.1"
            },
            "devDependencies": {
                "prisma": "^5.19.1"
            }
        }

        ```
    - Después, navegaremos con la terminal a nuestra carpeta `infrastructure` y ejecutaremos el siguiente comando:
        ```bash
            npm i
        ```
    - Ahora hay una carpeta `node_modules` en `infrastructure`: `./infrastructure/node_modules`
#### Configurar tsconfig.json
- Unificar lógica de los `tsconfig.json`. Para ello, crearemos un tsconfig.json en cada carpeta de la ruta raíz (`infrastructure`, `core`, `backend-express`).
    - Por ahora si no tienes requerimientos especiales utiliza este template en las tres carpetas:
        ```json
        {
            "compilerOptions": {
            "module": "CommonJS",
            "target": "ES2020",
            // "rootDir": "../", // ❓ Establece la carpeta raíz, sino la raíz es donde esta tsconfig.json
            "lib": [ "esnext"],
            // "lib": ["dom", "esnext"], // ✅⚠️ Biblotecas de tipos que importara ❓
            // "moduleResolution": "node", // ✅ Resolucion de modulos
            // "resolveJsonModule": true, // ✅ Permite importar archivos json 
            "esModuleInterop": true, // ✅ Interoperabilidad entre CommonJS y ES6
            "skipLibCheck": true, // ❓ Omitir verificación de tipos en .d.ts
            "strict": true, 
            "forceConsistentCasingInFileNames": true // ✅ Forzar mayúsculas y minúsculas en nombres de archivo
            },
            "include": ["<carpeta-en-esta-carpeta>", "./<otra-carpeta-de-la-carpeta>", "<[...]>"], // 🖊️🧠⚠️‼️ Carpetas las cuales va a incluir‼️
            "exclude": ["<carpeta-a-excluir-en-esta-carpeta>", "./<otra-carpeta-a-excluir-dentro-de-la-carpeta>", "<[...]>]"] //🖊️🧠⚠️‼️ Carpetas las cuales va a excluir‼️
        }
        ```
- Lo importante en este punto es que las carpetas tengan su propio `tsconfig.json`, para mantener el máximo de consistencia en la arquitectura. Todo y no ser obligatorio y poder buscar otros enfoques.
    - [Puedes ver esta question abordada aquí](./q-tsconfig.md)
    - Mas adelante, se modifica el tsconfig.json para adaptar-se concretamente a esta estructura.

#### Reestructurar Prisma
- Apuntar a la nueva ruta del `@prisma/client` en el `schema.prisma`.
    - Para esto podemos simplemente borrar el output añadido en el [Punto 1. Migración `backend-express/prisma` -> `backend-express/infrastructure/prisma`](#añadirmodificar-output-en-schemaprisma)
- Después, actualiza Prisma, generando y migrando.
    - Para este ejemplo, puedes utilizar los siguientes comandos:
        ```bash
            npx prisma generate
            npx prisma migrate dev
        ```
        
### Cambio estructura
#### Antigua estructura

```
project/
├── core/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   └── Post.ts
│   │   └── errors/
│   │       ├── main.ts
│   │       └── <others>.ts
│   └── application/
│       ├── usecases/
│       │   ├── CreateUserUseCase.ts ⚠️🖊️
│       │   └── CreatePostUseCase.ts ⚠️🖊️
│       ├── repositories/
│       │   ├── user.d.ts
│       │   └── post.d.ts
│       ├── services/
│       │   ├── email.d.ts
│       │   └── auth.d.ts
│       └── ports/ ❓🖊️
│           ├── in/
│           │   └── UserControllerPort.ts
│           └── out/
│               └── UserPersistencePort.ts
├── backend/
│   ├── infrastructure/
│   │   ├── prisma/ 
│   │   │   └── schema.prisma
│   │   ├── repositories/
│   │   │   ├── prisma-user.ts
│   │   │   └── prisma-post.ts
│   │   └── config/
│   │       └── prisma-db.ts
│   └── interfaces/ 
│       ├── controllers/
│       │   └── ExpressUserController.ts
│       └── routes/
│           └── userRoutes.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── frontend/
│   ├── src/
|   │   └── ...
|   ├── package.json
|   └── tsconfig.json
└── tsconfig.json
    
```
<div align="center">
⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
</div>

#### Estructura actual

```
project/
├── core/
│   └── ... (sin cambios)
├── infrastructure/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── repositories/
│   │   ├── prisma-user.ts
│   │   └── prisma-post.ts
│   ├── config/
│   │   └── prisma-db.ts
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── interfaces/ 
│   │   ├── controllers/
│   │   │   └── ExpressUserController.ts
│   │   └── routes/
│   │       └── userRoutes.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── frontend/
│   └── ... (sin cambios)
└── tsconfig.json ❌⚠️
```