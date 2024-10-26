import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { environment } from 'src/environment/environment';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';

@Module({
    imports: [
        UsersModule,
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
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
