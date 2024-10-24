import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuth.guard';
import { UserDTO } from 'src/modules/users/entities/user.types';
import { UsersService } from 'src/modules/users/users.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
    public constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get('profile')
    public getProfile(@Request() req): Promise<UserDTO> {
        return req.user;
    }

    @Get('profile/:id')
    public getUser(@Param('id') id: string): Promise<UserDTO> {
        return this.usersService.findOne(id);
    }
}
