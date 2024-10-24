export interface UserCredentials {
    username: string;
    password: string;
}

export interface LoginRequestBody {
    credentials: UserCredentials;
    remember: boolean;
}
