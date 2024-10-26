export interface BearerToken {
    access_token: string;
    expiresIn: number; // Durée de validité en secondes
    expiresAt: number; // Date d'expiration en millisecondes (timestamp)
}

export interface JwtToken {
    access_token: string;
}

export interface JwtPayload {
    username: string;
    sub: string;
    iat: number;
    exp: number;
}

export type JwtSubPayload = Omit<JwtPayload, 'iat' | 'exp'>;

export interface JwtUserPayload {
    username: string;
    userId: string;
}

export interface TokenPairs {
    accessToken: BearerToken;
    refreshToken: BearerToken;
}
