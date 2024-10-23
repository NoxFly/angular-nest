import { NextFunction, Request, Response } from "express";
import { statSync } from "fs";
import { join } from "path";
import { environment } from "src/environment/environment";

export function publicMiddleware(req: Request, res: Response, next: NextFunction): void {
    // Passe la main aux autres middlewares, serveur web
    if(req.path.startsWith(environment.backendUriPrefix)) {
        return next();
    }

    // sert le client (Angular)
    const filePath = join(environment.frontendPath, req.path);

    try {
        const fileStat = statSync(filePath);

        if (fileStat.isFile()) {
            return res.sendFile(filePath);
        }
    }
    catch (err) {
        // File does not exist, continue to serve index.html
    }

    // Serve the client (Angular)
    res.sendFile(join(environment.frontendPath, 'index.html'));
}
