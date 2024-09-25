<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# Hexagonal architecture migration
<a href="https://github.com/SKRTEEEEEE">
<div align="center">
  <img  src="https://github.com/SKRTEEEEEE/SKRTEEEEEE/blob/main/resources/img/grid-snake.svg"
       alt="snake" />
</div>
</a>

## Información

Proyecto para explorar conceptos y técnicas útiles especialmente en arquitecturas hexagonales/clean architecture o MVC.

### Guía de inicio
#### Pre requisitos
Para un proyecto web, un clásico "Getting Started" en castellano podría estructurarse de la siguiente manera:

- **Node.js**: Asegúrate de tener la última versión instalada. Puedes descargarla desde [nodejs.org](https://nodejs.org).
- **Un gestor de paquetes**: Generalmente, utilizamos npm (incluido con Node.js) o Yarn.

#### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Study-JavaScript/hexa-ts.git
   ```

2. **Navegar a la rama correspondiente al proyecto**:
    ```bash
    git checkout migrate-1
    ```

3. **Navegar a la carpeta de la `application`**:
   ```bash
   cd hexa-ts/application
   ```

4. **Instalar las dependencias**:
   ```bash
   npm i
   ```

   O si usas Yarn:
   ```bash
   yarn install
   ```
  
5. **Ejecutar el test de la `application`**:
    ```bash
    npm test
    ```

6. **Navegar a la carpeta del backend: `backend-express`**:
    ```bash
    cd ../backend-express
    ```

7. **Instalar dependencias**:
    ```bash
    npm i
    ```

8. **Ejecutar servidor**:
    ```bash
    npx ts-node index
    ```


#### Ejecución del Proyecto

Una vez que hayas instalado las dependencias, puedes iniciar el servidor de desarrollo:

```bash
npm start
```

O con Yarn:

```bash
yarn start
```

El proyecto debería estar corriendo en `http://localhost:3000` (o en el puerto que hayas configurado).


### Tecnologías utilizadas
- [**express**](https://expressjs.com/es/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www-dotenv-org.webpkgcache.com/doc/-/s/www.dotenv.org/docs/)
- [cors](https://www.npmjs.com/package/cors#usage)
- [**prisma**](https://www.prisma.io/docs)
- [**typescript**](https://www.typescriptlang.org/docs/)

<details><summary><h3>Estructura</h3></summary><br/>

- _Esta es la idea a seguir actualmente como estructura_
#### Estructura carpetas actual

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
└── tsconfig.json ❌⚠️
    
```

</details>

### [Proceso](./md/proceso.md)


## [Recursos](https://github.com/SKRTEEEEEE/markdowns)

## Contacto

### Agradecimientos

### Licencia

### Información de Contacto

#### [Envíame un mensaje](mailto:adanreh.m@gmail.com)

### Contribuciones y Problemas

Si encuentras problemas o deseas contribuir al proyecto, por favor, crea un issue en el repositorio.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">