export class UserModel {
  password: string;
  email: string;
  pseudo?: string;

  constructor(
    password: string,
    email: string,
    pseudo: string,
  ) {
    this.password = password;
    this.email = email;
    this.pseudo = pseudo;
  }
}


