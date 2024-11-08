import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { RiotModule } from 'src/modules/riot-games/riot-games.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        RiotModule,
    ],
})
export class AppModule {

}
