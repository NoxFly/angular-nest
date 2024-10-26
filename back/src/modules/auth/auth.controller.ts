import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from 'src/modules/auth/auth.service';
import { BearerToken } from 'src/modules/auth/entities/jwt.types';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuth.guard';
import { JwtRefreshAuthGuard } from 'src/modules/auth/guards/jwtRefresh.guard';
import { LocalAuthGuard } from 'src/modules/auth/guards/localAuth.guard';

@Controller('auth')
export class AuthController {
    public constructor(private readonly auth: AuthService) {}

    @Throttle({
        short: { limit: 2, ttl: 1000 },
        long: { limit: 5, ttl: 60000 }
    })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(@Request() req): Promise<BearerToken> {
        const tokens = await this.auth.login(req.user);



        return tokens.accessToken;
    }

    @Post('logout')
    public logout(): void {
        // si envie de faire des choses ici,
        // db, refreshToken clear, ...
    }

    @UseGuards(JwtAuthGuard)
    @Post('check')
    public check(): boolean {
        return true;
    }

    @UseGuards(JwtRefreshAuthGuard)
    @Post('refresh')
    public async refreshBearerToken(@Request() req): Promise<void> {
        // return this.auth.refreshBearer();
    }
}
