import { Injectable } from '@nestjs/common';
import { FakeDatabase } from 'src/_core/fakeDatabase';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UsersService {
    public constructor() {}

    public async findOne(userId: string): Promise<UserEntity | undefined> {
        const user = FakeDatabase.users.find(user => user.name === userId);
        return user;
    }
}
