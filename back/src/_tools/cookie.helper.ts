import { CookieOptions } from "express";
import { environment } from "src/environment/environment";

export function getCookieOptions(maxAge?: number): CookieOptions {
    return {
        httpOnly: true,
        secure: environment.production,
        sameSite: 'strict',
        maxAge,
    };
}
