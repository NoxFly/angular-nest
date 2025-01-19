import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserCredentialsDTO } from 'src/modules/auth/dto/credentials.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    public constructor(
        private readonly authService: AuthService,
    ) {}

    /**
     * Authentifie un utilisateur.
     */
    @ApiOperation({ description: 'Authentifie un utilisateur' })
    @ApiResponse({ status: 200, description: 'User logged in' })
    @ApiResponse({ status: 401, description: 'Wrong username or password' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @Post('login')
    public async login(
        @Res() res: Response,
        @Body() body: UserCredentialsDTO
    ): Promise<void> {
        const user = await this.authService.login(body, res);
        res.json(user);
    }

    /**
     * Déconnecte un utilisateur.
     */
    @ApiOperation({ description: 'Déconnecte un utilisateur en supprimant ses cookies' })
    @ApiResponse({ status: 204, description: 'User logged out' })
    @ApiResponse({ status: 401, description: 'Requested by an unauthenticated user' })
    @Post('logout')
    public async logout(
        @Res() res: Response
    ): Promise<void> {
        this.authService.logout(res);
        res.send();
    }

    /**
     * Si cette route aboutit sans erreur, l'appelant est authentifié.
     */
    @UseGuards(AuthGuard)
    @ApiOperation({ description: 'Vérifie si celui qui fait la requête est authentifié' })
    @ApiResponse({ status: 204, description: 'Request is done by an authenticated user' })
    @ApiResponse({ status: 401, description: 'Request is done by an unauthenticated user' })
    @Post('verify')
    public checkToken(): void {}
}
