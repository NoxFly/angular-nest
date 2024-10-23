import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { getCookieOptions } from 'src/_tools/cookie.helper';
import { convertTime } from 'src/_tools/time.helper';
import { environment } from 'src/environment/environment';
import { UserDTO } from 'src/modules/users/entities/user';
import { BearerToken, BearerTokenPayload, JwtPayload, RefreshTokenPayload, TokenType } from './entities/token';

@Injectable()
export class JwtTokenService {
    public constructor(private readonly jwtService: JwtService) {}

    public generateBearerToken(response: Response, payload: UserDTO, refreshTokenExp?: number): BearerToken {
        // refreshTokenExp is the expiration time of the refresh token in seconds
        // if refreshTokenExp is provided, then we calculate the time remaining between now and the expiration of the refresh token (in seconds)
        // otherwise, we use the default expiration time for the access token

        const defaultTTL = convertTime(environment.accessTokenExpiration, 's');
        const possibleTTL = refreshTokenExp ? Math.ceil(refreshTokenExp - Date.now() / 1000) : Infinity;

        const expiration = Math.min(defaultTTL, possibleTTL) + 's';

        const bearer = this.createToken(
            {
                sub: payload.id,
                scope: "user",
                user: payload,
            },
            environment.accessTokenSecret,
            expiration,
        );

        this.saveAccessToken(bearer, response);

        return bearer;
    }

    // Centralise la création d'un refresh token
    public generateRefreshToken(response: Response, payload: UserDTO, remember: boolean): BearerToken {
        const refreshToken = this.createToken(
            {
                sub: payload.id,
                user: payload,
            },
            environment.refreshTokenSecret,
            environment.refreshTokenExpiration,
        );

        this.saveRefreshToken(refreshToken, response, remember);

        return refreshToken;
    }

    // Vérification du JWT (access token)
    public verifyAccessToken(token: string): BearerTokenPayload & JwtPayload {
        return this.verifyToken<BearerTokenPayload>(token, environment.accessTokenSecret);
    }

    // Vérification du JWT (refresh token)
    public verifyRefreshToken(token: string): RefreshTokenPayload & JwtPayload {
        const res = this.verifyToken<RefreshTokenPayload>(token, environment.refreshTokenSecret);
        return res;
    }


    // ----------------------------------------

    private saveAccessToken(token: BearerToken, response: Response): void {
        const accessTokenExpiration = convertTime(environment.accessTokenExpiration, 'ms');
        response.cookie(TokenType.bearer, token.access_token, getCookieOptions(accessTokenExpiration));
    }

    private saveRefreshToken(token: BearerToken, response: Response, remember: boolean): void {
        const refreshTokenExpiration = remember
            ? convertTime(environment.refreshTokenExpiration, 'ms')
            : undefined;

        response.cookie(TokenType.refresh, token.access_token, getCookieOptions(refreshTokenExpiration));
    }


    // ----------------------------------------

    private createToken(payload: BearerTokenPayload | RefreshTokenPayload, secret: string, expiration: string): BearerToken {
        const access_token = this.jwtService.sign(payload, {
            secret,
            expiresIn: expiration,
        });

        const expiresIn = convertTime(expiration, 's');
        const expiresAt = Date.now() + expiresIn * 1000;

        const bearer: BearerToken = {
            access_token,
            expiresAt,
            expiresIn,
        };

        return bearer;
    }

    private verifyToken<T extends object>(token: string, secret: string): T & JwtPayload {
        return this.jwtService.verify<T & JwtPayload>(token, { secret });
    }
}
