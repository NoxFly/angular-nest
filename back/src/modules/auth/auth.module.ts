import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { environment } from 'src/environment/environment';

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
