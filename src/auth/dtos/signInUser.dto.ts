import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty({ message: 'Email obrigatório' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Senha obrigatória' })
  senha: string;
}
