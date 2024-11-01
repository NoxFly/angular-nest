import { UserEntity } from "src/modules/users/entities/user.entity";

export type UserDTO = Omit<UserEntity, 'password'>;
