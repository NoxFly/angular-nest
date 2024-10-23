export interface Bearer {
    access_token: string;
    expiresIn: number; // le temps restant avant expiration en secondes
    expiresAt: number; // timestamp de la date d'expiration en millisecondes
}

export interface JwtPayload {
    exp: number; // date en secondes à laquelle le token expire
    iat: number; // date en secondes à laquelle le token a été émis
}
