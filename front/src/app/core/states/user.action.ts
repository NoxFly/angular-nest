import { User } from "src/app/core/models/user.type";

export class SetUser {
    public static readonly type = '[User] Set User';
    public constructor(public user: User) {}
}

export class RemoveUser {
    public static readonly type = '[User] Remove User';
}
