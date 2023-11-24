import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findOne(id: number) {
        const user = await this.prisma.usuario.findUnique({
            where: { id },
        });

        return {
            email: user.email,
            nome: user.nome,
            data_atualizacao: user.dataAtualizacao,
            data_criacao: user.dataCriacao,
            ultimo_login: user.ultimoLogin,
        };
    }
}
