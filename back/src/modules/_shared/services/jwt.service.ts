import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { getCookieOptions } from 'src/_tools/cookie.helper';
import { convertTime } from 'src/_tools/time.helper';
import { environment } from 'src/environment/environment';
import { IBearerToken, IBearerTokenPayload, IJwtPayload, IRefreshTokenPayload, TokenType } from 'src/modules/_shared/interfaces/jwt.interfaces';

@Injectable()
export class JwtTokenService {
    public constructor(private readonly jwtService: JwtService) {}

    /**
     * 
     */
    public generateBearerToken<T>(response: Response, id: string, payload: T, refreshTokenExp?: number): IBearerToken {
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

    /**
     * Centralise la création d'un refresh token
     */
    public generateRefreshToken<T>(response: Response, id: string, payload: T, remember: boolean): IBearerToken {
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

    /**
     * 
     */
    public isTokenExpired(token: string): boolean {
        const payload = this.verifyAccessToken(token, false);
        return payload.exp < Date.now() / 1000;
    }

    /**
     * Vérification du JWT (access token)
     */
    public verifyAccessToken<T>(token: string, throwOnExpiration: boolean=true): IBearerTokenPayload<T> & IJwtPayload {
        return this.verifyToken<IBearerTokenPayload<T>>(token, environment.accessTokenSecret, !throwOnExpiration);
    }

    /**
     * Vérification du JWT (refresh token)
     */
    public verifyRefreshToken<T>(token: string): IRefreshTokenPayload<T> & IJwtPayload {
        return this.verifyToken<IRefreshTokenPayload<T>>(token, environment.refreshTokenSecret);
    }

    /**
     * 
     */
    public removeTokens(response: Response): void {
        response.clearCookie(TokenType.bearer);
        response.clearCookie(TokenType.refresh);
    }


    // ----------------------------------------

    /**
     * 
     */
    private saveAccessToken(token: IBearerToken, response: Response): void {
        const accessTokenExpiration = convertTime(environment.accessTokenExpiration, 'ms');

        const options = getCookieOptions(accessTokenExpiration);

        response.cookie(TokenType.bearer, token.access_token, options);
    }

    /**
     * 
     */
    private saveRefreshToken(token: IBearerToken, response: Response, remember: boolean): void {
        const refreshTokenExpiration = remember
            ? convertTime(environment.refreshTokenExpiration, 'ms')
            : undefined;

        const options = getCookieOptions(refreshTokenExpiration);

        response.cookie(TokenType.refresh, token.access_token, options);
    }


    // ----------------------------------------

    /**
     * 
     */
    private createToken<T>(payload: IBearerTokenPayload<T> | IRefreshTokenPayload<T>, secret: string, expiration: string): IBearerToken {
        const access_token = this.jwtService.sign(payload, {
            secret,
            expiresIn: expiration,
        });

        const expiresIn = convertTime(expiration, 's');
        const expiresAt = Date.now() + expiresIn * 1000;

        const bearer: IBearerToken = {
            access_token,
            expiresAt,
            expiresIn,
        };

        return bearer;
    }

    /**
     * 
     */
    private verifyToken<T extends object>(token: string, secret: string, ignoreExpiration: boolean = false): T & IJwtPayload {
        return this.jwtService.verify<T & IJwtPayload>(token, { secret, ignoreExpiration });
    }
}
