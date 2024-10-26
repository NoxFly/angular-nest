import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UserDTO } from 'src/modules/users/entities/user';
import { UsersService } from 'src/modules/users/users.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
    public constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get('hello')
    public helloWorld(): { message: string } {
        return {
            message: 'Hello, world !',
        };
    }

    @Get(':id')
    public getUser(@Param('id') id: string): Promise<UserDTO> {
        return this.usersService.findOne(id);
    }
}
