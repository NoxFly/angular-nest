import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { decryptRSA, hashPasswordSHA } from 'src/_core/helpers/crypto.helper';
import { JwtTokenService } from 'src/modules/_shared/services/jwt.service';
import { UserCredentialsDTO } from 'src/modules/auth/dto/credentials.dto';
import { UserDTO } from 'src/modules/users/dto/user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
    public constructor(
        private readonly jwtService: JwtTokenService,
        private readonly usersService: UsersService,
    ) {}

    /**
     * 
     */
    public async login(credentials: UserCredentialsDTO, response: Response): Promise<UserDTO> {
        try {
            credentials.password = decryptRSA(credentials.password);
        }
        catch(e) {
            throw new BadRequestException("Invalid credentials");
        }

        const hash = hashPasswordSHA(credentials.password);

        const user = await this.usersService.findOne(credentials.username);

        if(!user || user.password !== hash) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const { password, ...payload } = user;

        this.jwtService.generateRefreshToken(response, payload.id, payload, credentials.remember);
        this.jwtService.generateBearerToken(response, payload.id, payload);

        return payload;
    }

    /**
     * 
     */
    public logout(response: Response): void {
        this.jwtService.removeTokens(response);
    }
}
