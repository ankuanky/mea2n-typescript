export class FormModel {

  constructor (
    public username: string,
    public password: string,
    public rememberMe: boolean = false
  ) {}
}
