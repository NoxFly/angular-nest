import forge from 'node-forge';
import { createHash } from 'node:crypto';
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
export function decryptRSA(data: string): string {
    const privateKey = '-----BEGIN PRIVATE KEY-----'
        + environment.rsaPrivateKey
        + '-----END PRIVATE KEY-----';

    const rsa = forge.pki.privateKeyFromPem(privateKey);
    const decodedData = forge.util.decode64(data);
    const decryptedBytes = rsa.decrypt(decodedData, 'RSAES-PKCS1-V1_5');
    const decryptedText = forge.util.decodeUtf8(decryptedBytes);

    return decryptedText;
}