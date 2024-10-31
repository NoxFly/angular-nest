export type UserModel = {
    id: string;
    name: string;
    password: string;
    email: string;
};

export type UserDTO = Omit<UserModel, 'password'>;