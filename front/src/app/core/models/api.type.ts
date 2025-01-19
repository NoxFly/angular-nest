import { HttpParams } from "@angular/common/http";

export interface Credentials {
    username: string;
    password: string;
    remember?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Query = HttpParams | Record<string, any>;