import { Module } from '@nestjs/common';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from 'src/modules/users/users.service';

@Module({
    imports: [SharedModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
