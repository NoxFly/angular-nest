import { HttpStatus } from "@nestjs/common";

// Les interfaces de réponse de l'API de Riot Games
export interface IRiotApiAccountResponse {
    puuid: string;
    gameName: string;
    tagLine: string;
}

export interface IRiotErrorResponse {
    status:  {
        status_code: HttpStatus;
        message: string;
    }
}
