import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';

@Injectable()
export class AcceptHeaderMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: NextFunction): void {
        const acceptHeader = req.headers['accept'] || '';

        // Laisser NestJS gérer la requête (API)
        if(acceptHeader.includes('application/json')) {
            next();
        }
        // Servir Angular (fichiers statiques)
        else {
            res.sendFile(join(__dirname, '..', 'public', 'index.html'));
        }
    }
}