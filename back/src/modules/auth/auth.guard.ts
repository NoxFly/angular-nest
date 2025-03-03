import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenType } from 'src/modules/_shared/interfaces/jwt.interfaces';
import { JwtTokenService } from 'src/modules/_shared/services/jwt.service';
import { UserDTO } from 'src/modules/users/dto/user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(
        private readonly jwtService: JwtTokenService,
    ) {}

    /**
     * 
     */
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const httpContext = context.switchToHttp();

        const request = httpContext.getRequest();
        const response = httpContext.getResponse();

        let token = this.extractTokenFromCookies(request, TokenType.bearer);

        if(!token || this.jwtService.isTokenExpired(token)) {
            token = this.tryToRegenerateAccessToken(request, response);
        }

        if(!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = this.jwtService.verifyAccessToken<UserDTO>(token);
            request['user'] = payload.user;
            return true;
        }
        catch(e) {
            throw new UnauthorizedException();
        }
    }

    /**
     * Si le token est présent dans le header en tant que bearer,
     * donné par le client.
     */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    /**
     * Si le token est présent dans les cookies httpOnly.
     */
    private extractTokenFromCookies(request: Request, cookieName: string): string | undefined {
        return request.cookies[cookieName];
    }

    /**
     * Si l'access_token n'est pas présent dans les cookies,
     * C'est soit qu'il a expiré, soit qu'il n'a pas été fourni.
     * Dans le 1er cas, on tente de le renouveler avec le refresh_token.
     * Dans le 2nd cas, on renvoie une erreur 401, car l'utilisateur n'est pas authentifié.
     *
     * Peut throw une UnauthorizedException.
     */
    private tryToRegenerateAccessToken(request: Request, response: Response): string | undefined {
        // regarde si un refresh token est présent
        const refreshToken = this.extractTokenFromCookies(request, TokenType.refresh);

        // si non, on renvoie une erreur 401
        if(!refreshToken) {
            return undefined;
        }

        // si oui, on peut générer un nouvel access token
        try {
            const payload = this.jwtService.verifyRefreshToken<UserDTO>(refreshToken);
            const newBearer = this.jwtService.generateBearerToken(response, payload.user.id, payload.user, payload.exp);
            return newBearer.access_token;
        }
        catch(e) {
            return undefined;
        }
    }
}
