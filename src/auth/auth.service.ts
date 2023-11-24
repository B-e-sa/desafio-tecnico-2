import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Telefone } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }

    async signUp(data: {
        nome: string;
        email: string;
        senha: string;
        telefones: Telefone[];
    }) {
        try {
            const salt = await bcrypt.genSalt(10);

            data.senha = await bcrypt.hash(data.senha, salt);

            const userAlreadyExists = await this.prisma.usuario.findUnique({
                where: { email: data.email },
            });

            if (userAlreadyExists) {
                throw new BadRequestException({
                    message: 'Email já está em uso',
                });
            }

            const user = await this.prisma.usuario.create({
                data: {
                    ...data,
                    telefones: {
                        create: data.telefones,
                    },
                },
                include: { telefones: true },
            });

            const payload = {
                sub: user.id,
                username: user.nome,
            };

            const token = await this.jwt.signAsync(payload);

            return {
                id: user.id,
                dataAtualizacao: user.dataAtualizacao,
                dataCriacao: user.dataCriacao,
                ultimoLogin: user.ultimoLogin,
                token,
            };
        } catch (e) {
            throw new InternalServerErrorException({
                message: e.message,
            });
        }
    }

    async signIn(email: string, password: string) {
        const user = await this.prisma.usuario.findFirst({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException({
                message: 'Usuário e/ou senha inválidos',
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.senha);

        if (!isPasswordCorrect) {
            throw new UnauthorizedException({
                message: 'Usuário e/ou senha inválidos',
            });
        }

        const payload = {
            sub: user.id,
            username: user.nome,
        };

        const token = await this.jwt.signAsync(payload);

        return {
            id: user.id,
            ultimo_login: user.ultimoLogin,
            data_atualizacao: user.dataAtualizacao,
            data_criacao: user.dataCriacao,
            token,
        };
    }
}
