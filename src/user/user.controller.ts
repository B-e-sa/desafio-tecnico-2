import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly user: UserService) { }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param() param: { id: string }) {
        return this.user.findOne(Number(param.id));
    }
}
