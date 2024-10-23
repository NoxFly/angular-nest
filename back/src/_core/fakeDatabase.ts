import { createHash } from "crypto";
import { UserModel } from "src/modules/users/entities/user";

export class FakeDatabase {
    public static readonly users: UserModel[] = [
        {
            id: '1',
            name: 'admin',
            password: createHash('sha256').update('test').digest('hex'),
            email: 'admin@gmail.com',
        }
    ];
}
