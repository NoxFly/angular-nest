import { UserDTO } from "src/modules/users/entities/user.entity";

export type BearerToken = {
    access_token: string;
    expiresIn: number; // Durée de validité en secondes
    expiresAt: number; // Date d'expiration en millisecondes (timestamp)
};

export type JwtPayload = {
    iat: number; // Date de création du token en secondes
    exp: number; // Date d'expiration du token en secondes
};

export enum TokenType {
    bearer = 'bearer_token',
    refresh = 'refresh_token',
}

export type BearerTokenPayload = {
    sub: string;
    scope?: string;
    user: UserDTO;
};

export type RefreshTokenPayload = {
    sub: string;
    user: UserDTO;
    remember: boolean;
};
