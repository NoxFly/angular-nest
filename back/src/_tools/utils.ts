export function formatUri(uri: string, args: Record<string, string>): string {
    return Object.entries(args).reduce((acc, [key, value]) => {
        return acc.replace(`{${key}}`, value);
    }, uri);
}
