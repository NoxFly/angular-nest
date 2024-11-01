export interface BearerToken {
    access_token: string;
    expiresIn: number; // Durée de validité en secondes
    expiresAt: number; // Date d'expiration en millisecondes (timestamp)
}

export interface JwtPayload {
    iat: number; // Date de création du token en secondes
    exp: number; // Date d'expiration du token en secondes
}

export enum TokenType {
    bearer = 'bearer_token',
    refresh = 'refresh_token',
}

export interface BearerTokenPayload<T> {
    sub: string;
    scope?: string;
    user: T;
}

export interface RefreshTokenPayload<T> {
    sub: string;
    user: T;
    remember: boolean;
}
