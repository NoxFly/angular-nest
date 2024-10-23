import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './modules/_shared/shared.module';

@Module({
    imports: [AuthModule, UsersModule, SharedModule],
})
export class AppModule {

}
