import { hashPassword } from "src/_tools/password";
import { UserModel } from "src/modules/users/entities/user.types";

export class FakeDatabase {
    public static readonly users: UserModel[] = [
        {
            id: '1',
            name: 'admin',
            password: hashPassword('test'),
            email: 'admin@gmail.com',
        }
    ];
}
