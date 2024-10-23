import { environment } from "src/environment/environment";

export class Logger {
    public static log(...message: any[]): void {
        if(!environment.production) {
            console.log("[LOG]  ", ...message);
        }
    }

    public static debug(...message: any[]): void {
        if(!environment.production) {
            console.debug("[DEBUG]", ...message);
        }
    }

    public static error(...message: any[]): void {
        console.error("[ERROR]", ...message);
    }

    public static warn(...message: any[]): void {
        console.warn("[WARN] ", ...message);
    }

    public static info(...message: any[]): void {
        console.info("[INFO] ", ...message);
    }

    public static table(objOrLabel: string | any, obj?: any): void {
        if(!environment.production) {
            if(typeof objOrLabel === "string") {
                Logger.debug(objOrLabel);
            }
            else {
                obj = objOrLabel;
            }

            console.table(obj);
        }
    }
}
