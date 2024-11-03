import { HttpStatus } from "@nestjs/common";
import { RiotPlatformRegion, RiotRegionContinent } from "src/modules/riot-games/api/constants/regions";

// Les interfaces de réponse de l'API de Riot Games
export interface IRiotApiAccountResponse {
    puuid: string;
    gameName: string;
    tagLine: string;
}

export interface IRiotAccount {
    uuid: string; // pas le puuid car doit rester privé, mais un uuid généré pour l'application
    username: string;
    tag: string;
    region: RiotPlatformRegion;
    continent: RiotRegionContinent;
}

export interface IRiotErrorResponse {
    status:  {
        status_code: HttpStatus;
        message: string;
    }
}
