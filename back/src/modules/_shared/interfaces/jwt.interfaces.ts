export interface IBearerToken {
    access_token: string;
    expiresIn: number; // Durée de validité en secondes
    expiresAt: number; // Date d'expiration en millisecondes (timestamp)
}

export interface IJwtPayload {
    iat: number; // Date de création du token en secondes
    exp: number; // Date d'expiration du token en secondes
}

export interface IBearerTokenPayload<T> {
    sub: string;
    scope?: string;
    user: T;
}

export interface IRefreshTokenPayload<T> {
    sub: string;
    user: T;
    remember: boolean;
}

export enum TokenType {
    bearer = 'bearer_token',
    refresh = 'refresh_token',
}
