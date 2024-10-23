<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# Arquitectura de Puertos y Adaptadores
<a href="https://github.com/SKRTEEEEEE">
<div align="center">
  <img  src="https://github.com/SKRTEEEEEE/SKRTEEEEEE/blob/main/resources/img/grid-snake.svg"
       alt="snake" />
</div>
</a>

## Información

Actual ejercicio 5.1, antiguo ejercicio 6 del curso de [NodeJS](https://nodejs.org/en) de [ItAcademy](https://www.barcelonactiva.cat/es/itacademy).

Proyecto para explorar conceptos y técnicas útiles especialmente en arquitecturas hexagonales/clean architecture o MVC.
### Requisitos 
#### Requisitos técnicos endpoints
<details>
<summary>Requisitos frontend</summary>
- Posibilidad buscar posts -> que contengan ciertas letras como titulo 🖊️ <br/>
- Crear usuario <br/>
- Read usuario por email <br/>
- Read todas las publicaciones <br/>
- Read usuario (?por id?) <br/>
- Update usuario
</details>
<details>
<summary>Requisitos backend</summary>
- Crear publicaciones <br/>
- Crear like <br/>
- Read publicaciones por user <br/>
- Delete publicaciones por user <br/>
- Editar publicaciones por user <br/>
- **Solo admin**<br/>
  - Read todos los usuarios <br/>
  - Banear/Reactivar usuarios <br/>
  - Delete publicaciones  <br/>
  </details>


### Guía de inicio
#### Pre requisitos

- **Node.js**: Asegúrate de tener la última versión instalada. Puedes descargarla desde [nodejs.org](https://nodejs.org).
- **Un gestor de paquetes**: Generalmente, utilizamos npm (incluido con Node.js) o Yarn.

##### Importación

- **Clonar el repositorio**:
   ```bash
   git clone --recurse-submodules https://github.com/Study-JavaScript/hexa-ts.git
   ```
#### Backend

- **Navegar a la carpeta del backend: `backend-express`**:
    ```bash
    cd backend-express
    ```

- **Crear el .env**:
    ```bash
    echo -e '# Jwt secret\n\nJWT_SECRET="ILoveNode"' > .env
    ```

- **Instalar las dependencias**:
   ```bash
   npm i
   ```

- **Levantar backend**:
    ```bash
    npx ts-node index
    ```

    Ahora podras ver la documentación de el backend en: 
    
    [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)
  
#### Frontend
_Se recomienda usar pnpm_
- Si tienes corriendo el servidor, puedes abrir una nueva terminal.
- **Navegar a la carpeta del frontend:** _desde la carpeta`backend-express`_
    ```bash
    cd ../frontend-astro
    ```

- **Instalar las dependencias**:
   ```bash
   npm i
   ## or
   pnpm i
   ```

- **Levantar frontend**:
    
    Una vez que hayas instalado las dependencias, puedes iniciar el servidor de desarrollo:

    ```bash
    npm run dev
    ## or
    pnpm dev
    ```

    El proyecto debería estar corriendo en [`http://localhost:4321`](http://localhost:4321) (o en el puerto que hayas configurado).

#### Ejecución de Pruebas
- Si tienes corriendo el servidor, puedes abrir una nueva terminal.
- **Navegar a la carpeta de la application:** _desde `frontend-astro`_
    
    ```bash
    cd ../application
    ```

- **Instalar las dependencias**:
   ```bash
   npm i
   ```

- **Ejecutar el test de la `application`**:
    ```bash
    npm test
    ```


### Tecnologías utilizadas
- [**express**](https://expressjs.com/es/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www-dotenv-org.webpkgcache.com/doc/-/s/www.dotenv.org/docs/)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [cors](https://www.npmjs.com/package/cors#usage)
- [**prisma**](https://www.prisma.io/docs)
- [**typescript**](https://www.typescriptlang.org/docs/)
- [**astro**](https://astro.build/)
- [**tailwindcss**](https://tailwindcss.com/)
- [react](https://es.react.dev/)
- [shadcnui](https://ui.shadcn.com/)

<details><summary><h3>Estructura</h3></summary><br/>

- _Esta es la idea a seguir actualmente como estructura_
#### Estructura carpetas actual


```
project/
├── domain/
│   ├── entities/
│   │   ├── User.ts
│   │   └── Post.ts
│   ├── errors/
│   │   ├── MainError.ts
│   │   └── <other-errors>.ts
│   └── tsconfig.json
├── application/
│   ├── usecases/
│   │   ├── CreateUserUseCase.ts ⚠️🖊️
│   │   └── CreatePostUseCase.ts ⚠️🖊️
│   ├── repositories/
│   │   ├── IUserRepository.ts
│   │   └── IPostRepository.ts
│   ├── services/ ❓⚠️
│   │   ├── IEmailService.ts
│   │   └── IAuthService.ts
│   ├── test/
│   │   ├── user/
│   │   │   └── createUser.test.ts
│   │   └── post/
│   │       └── updatePost.test.ts
│   ├── ports/ ❓🖊️
│   │   ├── in/
│   │   │   └── IUserControllerPort.ts
│   │   └── out/
│   │       └── IUserPersistencePort.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── infrastructure/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── repositories/
│   │   ├── PrismaUserRepository.ts
│   │   └── PrismaPostRepository.ts
│   ├── config/
│   │   └── PrismaDbConfig.ts
│   ├── package.json
│   ├── .env
│   ├── tsconfig.json
│   └── node_modules
├── backend/
│   └── interfaces/
│       ├── controllers/
│       │   └── ExpressUserController.ts
│       ├── routes/
│       │   └── UserRoutes.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── frontend/
│   ├── src/
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   └── ...

```


</details>

### [Proceso](./md/proceso.md)


## [Recursos](https://github.com/SKRTEEEEEE/markdowns)

- [Documentación sobre `jsdocs`](https://www.npmjs.com/package/swagger-jsdoc)

## Contacto

### Agradecimientos

### Licencia

### Información de Contacto
#### [Web del desarrollador](https://profile-skrt.vercel.app)
#### [Envíame un mensaje](mailto:adanreh.m@gmail.com)

### Contribuciones y Problemas

Si encuentras problemas o deseas contribuir al proyecto, por favor, crea un issue en el repositorio.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">