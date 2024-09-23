// core/src/domain/entities/User.ts

export class User {
    constructor(
      public id: number,
      public email: string,
      public password: string,
      public name: string | null,
      public role: string = "USER",
      public banned: boolean = false
    ) {}
  }
