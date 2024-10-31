import { Injectable } from '@nestjs/common';
import { FakeDatabase } from 'src/_core/fakeDatabase';
import { UserModel } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UsersService {
    public constructor() {}

    public async findOne(userId: string): Promise<UserModel | undefined> {
        return FakeDatabase.users.find(user => user.name === userId);
    }
}
