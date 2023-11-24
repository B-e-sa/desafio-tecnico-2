import { Telefone } from '@prisma/client';
import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class CreatedUserDto {
  @IsNotEmpty({ message: 'Nome inválido' })
  nome: string;

  @IsNotEmpty({ message: 'Email inválido' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Senha inválida' })
  senha: string;

  @IsNotEmpty({ message: 'Telefone(s) obrigatório(s)' })
  @IsArray({ message: 'A propriedade telefones deve ser um array' })
  telefones: Telefone[];
}
