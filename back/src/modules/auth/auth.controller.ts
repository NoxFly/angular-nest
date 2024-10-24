import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtToken } from 'src/modules/auth/entities/jwt.types';
import { LocalAuthGuard } from 'src/modules/auth/guards/localAuth.guard';

@Controller('auth')
export class AuthController {
    public constructor(private readonly auth: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public login(@Request() req): Promise<JwtToken> {
        return this.auth.login(req.user);
    }


    @UseGuards(LocalAuthGuard)
    @Post('logout')
    public logout(@Request() req): void {
        const r = req.logout();
        return r;
    }
}
