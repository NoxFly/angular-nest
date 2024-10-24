import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { environment } from 'src/environment/environment';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        SharedModule,
        JwtModule.register({
            global: true,
            secret: environment.accessTokenSecret,
            signOptions: {
                expiresIn: environment.accessTokenExpiration,
            }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
