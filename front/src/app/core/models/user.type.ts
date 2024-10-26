export interface User {
    id: string;
    name: string;
    email: string;
}

export class UserStateModel {
    public user: User | null = null;
}
