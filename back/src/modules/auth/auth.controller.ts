import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { BearerToken, JwtPayload, TokenType } from 'src/modules/_shared/entities/token';
import { JwtTokenService } from 'src/modules/_shared/jwt.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserCredentials } from 'src/modules/auth/entities/credentials';

@Controller('auth')
export class AuthController {
    public constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtTokenService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login(@Res() res: Response, @Body() body: UserCredentials): Promise<void> {
        await this.authService.login(body, res);
        res.send(); // obligé de renvoyer une réponse, même vide, sinon timeout côté client
    }

    @UseGuards(AuthGuard)
    @Post('check')
    public checkToken(): boolean {
        return true;
    }

    // DEV - DEMO ONLY
    @UseGuards(AuthGuard)
    @Get('tokens')
    public toto(@Req() req: Request): {
        refreshToken: BearerToken & JwtPayload;
        accessToken: BearerToken & JwtPayload
    } {
        const refreshToken = req.cookies[TokenType.refresh];
        const accessToken = req.cookies[TokenType.bearer];

        const refresh = this.jwtService.verifyRefreshToken(refreshToken);
        const access = this.jwtService.verifyAccessToken(accessToken);

        return {
            refreshToken: {
                access_token: '',
                expiresIn: refresh.exp - refresh.iat,
                expiresAt: refresh.exp * 1000, // sec to ms
                exp: refresh.exp,
                iat: refresh.iat,
            },
            accessToken: {
                access_token: '',
                expiresIn: access.exp - access.iat,
                expiresAt: access.exp * 1000, // sec to ms
                exp: access.exp,
                iat: access.iat,
            }
        };
    }
}
