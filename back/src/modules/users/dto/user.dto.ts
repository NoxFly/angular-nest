import { UserModel } from "src/modules/users/entities/user.entity";

export type UserDTO = Omit<UserModel, 'password'>;
