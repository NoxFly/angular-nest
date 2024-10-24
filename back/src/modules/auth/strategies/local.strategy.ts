import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/modules/auth/auth.service";
import { UserCredentials } from "src/modules/auth/entities/credentials.types";
import { UserDTO } from "src/modules/users/entities/user.types";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    public constructor(private readonly auth: AuthService) {
        super();
    }

    public async validate(credentials: UserCredentials): Promise<UserDTO> {
        const user = await this.auth.validateUser(credentials);

        if(user) {
            return user;
        }

        throw new UnauthorizedException();
    }
}
