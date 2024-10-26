export interface Credentials {
    username: string;
    password: string;
    remember?: boolean;
}

export interface LoginResponse {
    access_token: string;
}
