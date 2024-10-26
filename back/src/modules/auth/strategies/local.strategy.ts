import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/modules/auth/auth.service";
import { UserDTO } from "src/modules/users/entities/user.types";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    public constructor(private readonly auth: AuthService) {
        super();
    }

    public async validate(username: string, password: string): Promise<UserDTO> {
        const user = await this.auth.validateUser({ username, password });

        if(user) {
            return user;
        }

        throw new UnauthorizedException();
    }
}
