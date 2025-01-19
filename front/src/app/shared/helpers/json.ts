

export async function parseJSON<T=unknown>(json: string): Promise<T> {
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(json));
        }
        catch(error) {
            reject(error);
        }
    });
}

export function parseJSONSync<T=unknown>(json: string): T {
    try {
        return JSON.parse(json);
    }
    catch(error) {
        throw error;
    }
}

export function deepCopy<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
}
