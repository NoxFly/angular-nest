import { createHash, publicEncrypt, privateDecrypt } from 'node:crypto';
import { environment } from 'src/environment/environment';

/**
 * 
 */
export function hashPasswordSHA(password: string): string {
    return createHash('sha256').update(password).digest('hex');
}

/**
 * 
 */
export function encryptRSA(data: string): string {
    const publicKey = environment.rsaPublicKey;

    const buffer = Buffer.from(data, 'utf8');
    const encrypted = publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
}

/**
 * 
 */
export function decryptRSA(data: string): string {
    const privateKey = environment.rsaPrivateKey;

    const buffer = Buffer.from(data, 'base64');
    const decrypted = privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
}