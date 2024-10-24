import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { environment } from "src/environment/environment";
import { JwtPayload, JwtUserPayload } from "src/modules/auth/entities/jwt.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: environment.accessTokenSecret,
        });
    }

    public async validate(payload: JwtPayload): Promise<JwtUserPayload> {
        console.log(payload);
        return { userId: payload.sub, username: payload.username };
    }
}
