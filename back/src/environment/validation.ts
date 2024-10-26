import * as assert from "assert";
import { environment } from "src/environment/environment";

for(const key in environment) {
    const value = environment[key];

    // if value is of type "#{...}", it means it's a placeholder to replace by process.env.{...}
    // so, if in that case, assert it exists (not undefined) and then replace, otherwise do nothing
    if(typeof value === "string" && value.startsWith('#{') && value.endsWith('}')) {
        const envKey = value.slice(2, -1);
        assert.notEqual(process.env[envKey], undefined, `process.env.${envKey} is required`);
        environment[key] = process.env[envKey];
    }
}
