import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UserDTO } from 'src/modules/users/dto/user.dto';
import { UsersService } from 'src/modules/users/users.service';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
    public constructor(
        private readonly usersService: UsersService,
    ) {}

    /**
     * Renvoie les données de l'utilisateur connecté.
     */
    @ApiOperation({ description: 'Retrouve un utilisateur par son identifiant' })
    @ApiResponse({ status: 200, description: 'User found and returned' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Get('me')
    public async me(
        @Req() req: Request,
    ): Promise<UserDTO> {
        const user: UserDTO = req['user'];
        const userObj = await this.usersService.findOne(user.id);
        delete userObj.password;
        return userObj;
    }

    /**
     * Retrouve un utilisateur par son id.
     */
    @ApiOperation({ description: 'Retrouve un utilisateur par son identifiant' })
    @ApiResponse({ status: 200, description: 'User found and returned' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Get(':id')
    public async getUser(
        @Param('id') id: string
    ): Promise<UserDTO> {
        return await this.usersService.findOne(id);
    }
}
