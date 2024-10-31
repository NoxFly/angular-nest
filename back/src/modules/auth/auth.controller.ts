import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserCredentials } from 'src/modules/auth/entities/credentials.entity';

@Controller('auth')
export class AuthController {
    public constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    public async login(@Res() res: Response, @Body() body: UserCredentials): Promise<void> {
        const user = await this.authService.login(body, res);
        res.json(user);
    }

    @Post('logout')
    public async logout(@Res() res: Response): Promise<void> {
        this.authService.logout(res);
        res.send();
    }

    @UseGuards(AuthGuard)
    @Post('check')
    public checkToken(): boolean {
        return true;
    }
}
