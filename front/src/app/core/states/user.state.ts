import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User, UserStateModel } from "src/app/core/models/user.type";
import { RemoveUser, SetUser } from "src/app/core/states/user.action";

@State<UserStateModel>({
    name: 'user',
    defaults: new UserStateModel(),
})
@Injectable()
export class UserState {
    @Selector()
    public static user(state: UserStateModel): User | null {
        return state.user;
    }

    @Action(SetUser)
    public setUser(ctx: StateContext<UserStateModel>, payload: SetUser): void {
        ctx.patchState({
            user: payload.user,
        });
    }

    @Action(RemoveUser)
    public removeUser(ctx: StateContext<UserStateModel>): void {
        ctx.setState(new UserStateModel());
    }
}
