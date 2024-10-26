import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/_tools/password';
import { convertTime } from 'src/_tools/time.helper';
import { environment } from 'src/environment/environment';
import { UserCredentials } from 'src/modules/auth/entities/credentials.types';
import { BearerToken, JwtSubPayload, TokenPairs } from 'src/modules/auth/entities/jwt.types';
import { UserDTO } from 'src/modules/users/entities/user.types';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
    public constructor(
        private readonly usersService: UsersService,
        private readonly jwt: JwtService,
    ) {}

    public async validateUser(credentials: UserCredentials): Promise<UserDTO | null> {
        const user = await this.usersService.findOne(credentials.username);

        if(user && user.password === hashPassword(credentials.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    public async login(user: UserDTO): Promise<TokenPairs> {
        const payload: JwtSubPayload = {
            username: user.name,
            sub: user.id
        };

        const accessToken = this.generateToken(payload, environment.accessTokenSecret, environment.accessTokenExpiration);
        const refreshToken = this.generateToken(payload, environment.refreshTokenSecret, environment.refreshTokenExpiration);

        return { accessToken, refreshToken };
    }

    public async refreshTokens(): Promise<void> {

    }


    private generateToken(payload: JwtSubPayload, secret: string, expirationDelay: string): BearerToken {
        const access_token: string = this.jwt.sign(payload, {
            secret,
            expiresIn: expirationDelay,
        });

        const expiresIn = convertTime(expirationDelay, 'ms');
        const expiresAt = Date.now() + expiresIn;

        return {
            access_token,
            expiresIn,
            expiresAt,
        };
    }
}
