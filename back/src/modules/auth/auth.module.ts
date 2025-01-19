import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/environment/environment';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
    imports: [
        SharedModule,
        UsersModule,
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
})
export class AuthModule {}
