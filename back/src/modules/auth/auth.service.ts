import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/_tools/password';
import { UserCredentials } from 'src/modules/auth/entities/credentials.types';
import { JwtPayload, JwtToken } from 'src/modules/auth/entities/jwt.types';
import { UserDTO } from 'src/modules/users/entities/user.types';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
    public constructor(
        private readonly usersService: UsersService,
        private readonly jwt: JwtService,
    ) {}

    public async validateUser(credentials: UserCredentials): Promise<UserDTO> {
        const user = await this.usersService.findOne(credentials.username);

        if(user && user.password === hashPassword(credentials.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    public async login(user: UserDTO): Promise<JwtToken> {
        const payload: JwtPayload = {
            username: user.name,
            sub: user.id
        };

        return {
            access_token: this.jwt.sign(payload),
        };
    }
}
