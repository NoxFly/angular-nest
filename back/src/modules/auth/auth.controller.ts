import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserCredentials } from 'src/modules/auth/entities/credentials';
import { UserDTO } from 'src/modules/users/entities/user';

@Controller('auth')
export class AuthController {
    public constructor(
        private readonly authService: AuthService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login(@Res() res: Response, @Body() body: UserCredentials): Promise<UserDTO> {
        return this.authService.login(body, res);
    }

    @Post('logout')
    public async logout(@Res() res: Response): Promise<void> {
        this.authService.logout(res);
        res.send(); // obligé de renvoyer une réponse, même vide, sinon timeout côté client
    }

    @UseGuards(AuthGuard)
    @Post('check')
    public checkToken(): boolean {
        return true;
    }
}
