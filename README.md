<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# Hexagonal architecture
<a href="https://github.com/SKRTEEEEEE">
<div align="center">
  <img  src="https://github.com/SKRTEEEEEE/SKRTEEEEEE/blob/main/resources/img/grid-snake.svg"
       alt="snake" />
</div>
</a>

## Información

Proyecto para explorar conceptos y técnicas útiles especialmente en arquitecturas hexagonales/clean architecture o MVC.

### Tecnologías utilizadas
- [**express**](https://expressjs.com/es/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www-dotenv-org.webpkgcache.com/doc/-/s/www.dotenv.org/docs/)
- [cors](https://www.npmjs.com/package/cors#usage)
- [**prisma**](https://www.prisma.io/docs)
- [**typescript**](https://www.typescriptlang.org/docs/)

<details><summary><code><bold>Estructura</bold> </code></summary><br/>

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
├── backend/
│   ├── infrastructure/
│   │   ├── prisma/ ❓⚠️ //Podría pasar esta parte aquí??
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
│   ├── prisma/
│   │   └── schema.prisma
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

</details>


## [Recursos](https://github.com/SKRTEEEEEE/markdowns)

## Contacto

### Agradecimientos

### Licencia

### Información de Contacto

#### [Envíame un mensaje](mailto:adanreh.m@gmail.com)

### Contribuciones y Problemas

Si encuentras problemas o deseas contribuir al proyecto, por favor, crea un issue en el repositorio.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">