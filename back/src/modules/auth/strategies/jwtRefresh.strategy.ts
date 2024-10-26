import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { environment } from "src/environment/environment";
import { JwtPayload } from "src/modules/auth/entities/jwt.types";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    public constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environment.accessTokenSecret,
            ignoreExpiration: true,
            passReqToCallback: true,
        });
    }

    public async validate(req: Request, payload: JwtPayload): Promise<any> {
        const token = req.get('Authorization').replace('Bearer', '').trim();

        return {
            token,
            ...payload
        };
    }
}
