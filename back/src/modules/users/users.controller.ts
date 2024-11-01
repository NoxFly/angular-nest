import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UserDTO } from 'src/modules/users/dto/user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
    public constructor(
        private readonly usersService: UsersService,
    ) {}

    /**
     * Retrouve un utilisateur par son id.
     */
    @ApiResponse({ status: 200, description: 'User found and returned' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Get(':id')
    public getUser(@Param('id') id: string): Promise<UserDTO> {
        const user = this.usersService.findOne(id);
        return user;
    }
}
