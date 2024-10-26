import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash } from 'crypto';
import { Response } from 'express';
import { JwtTokenService } from 'src/modules/_shared/jwt.service';
import { UserCredentials } from 'src/modules/auth/entities/credentials';
import { UserDTO } from 'src/modules/users/entities/user';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
    public constructor(
        private readonly jwtService: JwtTokenService,
        private readonly usersService: UsersService,
    ) {}

    private hashPassword(password: string): string {
        return createHash('sha256').update(password).digest('hex');
    }

    public async login(credentials: UserCredentials, response: Response): Promise<UserDTO> {
        const hash = this.hashPassword(credentials.password);

        const user = await this.usersService.findOne(credentials.username);

        if(!user || user.password !== hash) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const { password, ...payload } = user;

        this.jwtService.generateRefreshToken(response, payload, credentials.remember);
        this.jwtService.generateBearerToken(response, payload);

        return payload;
    }

    public logout(response: Response): void {
        this.jwtService.removeTokens(response);
    }
}
