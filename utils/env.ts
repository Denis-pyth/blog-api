export function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        console.error(` Missing environment variable: ${key}`);
        process.exit(1);
    }
    return value;
}