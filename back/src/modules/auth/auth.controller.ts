import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserCredentials } from 'src/modules/auth/entities/credentials.entity';

@Controller('auth')
export class AuthController {
    public constructor(
        private readonly authService: AuthService,
    ) {}

    /**
     * Authentifie un utilisateur.
     */
    @Post('login')
    @ApiResponse({ status: 201, description: 'User logged in' })
    @ApiResponse({ status: 401, description: 'Wrong username or password' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    public async login(@Res() res: Response, @Body() body: UserCredentials): Promise<void> {
        const user = await this.authService.login(body, res);
        res.json(user);
    }

    /**
     * Déconnecte un utilisateur.
     */
    @Post('logout')
    @ApiResponse({ status: 201, description: 'User logged out' })
    public async logout(@Res() res: Response): Promise<void> {
        this.authService.logout(res);
        res.send();
    }

    /**
     * Si cette route aboutit sans erreur, l'appelant est authentifié.
     */
    @UseGuards(AuthGuard)
    @Post('check')
    @ApiResponse({ status: 201, description: 'Request is done by an authenticated user' })
    @ApiResponse({ status: 401, description: 'Request is done by an unauthenticated user' })
    public checkToken(): boolean {
        return true;
    }
}
