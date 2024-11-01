import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { getCookieOptions } from 'src/_tools/cookie.helper';
import { convertTime } from 'src/_tools/time.helper';
import { environment } from 'src/environment/environment';
import { BearerToken, BearerTokenPayload, JwtPayload, RefreshTokenPayload, TokenType } from 'src/modules/_shared/entities/jwt.entity';

@Injectable()
export class JwtTokenService {
    public constructor(private readonly jwtService: JwtService) {}

    public generateBearerToken<T>(response: Response, id: string, payload: T, refreshTokenExp?: number): BearerToken {
        // refreshTokenExp is the expiration time of the refresh token in seconds
        // if refreshTokenExp is provided, then we calculate the time remaining between now and the expiration of the refresh token (in seconds)
        // otherwise, we use the default expiration time for the access token

        const defaultTTL = convertTime(environment.accessTokenExpiration, 's');
        const possibleTTL = refreshTokenExp ? Math.ceil(refreshTokenExp - Date.now() / 1000) : Infinity;

        const expiration = Math.min(defaultTTL, possibleTTL) + 's';

        const bearer = this.createToken(
            {
                sub: id,
                user: payload,
                scope: "user",
            },
            environment.accessTokenSecret,
            expiration,
        );

        this.saveAccessToken(bearer, response);

        return bearer;
    }

    // Centralise la création d'un refresh token
    public generateRefreshToken<T>(response: Response, id: string, payload: T, remember: boolean): BearerToken {
        const duration = remember
            ? environment.refreshTokenExpiration
            : environment.sessionDuration;

        const refreshToken = this.createToken(
            {
                sub: id,
                user: payload,
                remember,
            },
            environment.refreshTokenSecret,
            duration,
        );

        this.saveRefreshToken(refreshToken, response, remember);

        return refreshToken;
    }

    public isTokenExpired(token: string): boolean {
        const payload = this.verifyAccessToken(token, false);
        return payload.exp < Date.now() / 1000;
    }

    // Vérification du JWT (access token)
    public verifyAccessToken<T>(token: string, throwOnExpiration: boolean=true): BearerTokenPayload<T> & JwtPayload {
        return this.verifyToken<BearerTokenPayload<T>>(token, environment.accessTokenSecret, !throwOnExpiration);
    }

    // Vérification du JWT (refresh token)
    public verifyRefreshToken<T>(token: string): RefreshTokenPayload<T> & JwtPayload {
        return this.verifyToken<RefreshTokenPayload<T>>(token, environment.refreshTokenSecret);
    }

    public removeTokens(response: Response): void {
        response.clearCookie(TokenType.bearer);
        response.clearCookie(TokenType.refresh);
    }


    // ----------------------------------------

    private saveAccessToken(token: BearerToken, response: Response): void {
        const accessTokenExpiration = convertTime(environment.accessTokenExpiration, 'ms');

        const options = getCookieOptions(accessTokenExpiration);

        response.cookie(TokenType.bearer, token.access_token, options);
    }

    private saveRefreshToken(token: BearerToken, response: Response, remember: boolean): void {
        const refreshTokenExpiration = remember
            ? convertTime(environment.refreshTokenExpiration, 'ms')
            : undefined;

        const options = getCookieOptions(refreshTokenExpiration);

        response.cookie(TokenType.refresh, token.access_token, options);
    }


    // ----------------------------------------

    private createToken<T>(payload: BearerTokenPayload<T> | RefreshTokenPayload<T>, secret: string, expiration: string): BearerToken {
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

    private verifyToken<T extends object>(token: string, secret: string, ignoreExpiration: boolean = false): T & JwtPayload {
        return this.jwtService.verify<T & JwtPayload>(token, { secret, ignoreExpiration });
    }
}
