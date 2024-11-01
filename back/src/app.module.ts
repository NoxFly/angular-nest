import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { RiotModule } from './modules/riot/riot.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        RiotModule,
    ],
})
export class AppModule {

}
