import { HttpException } from "@nestjs/common";
import { environment } from "src/environment/environment";
import { RiotEndpoint, RiotErrorResponse, RiotPlatformRegion, RiotRegionContinent } from "src/modules/riot/entities/api/riot.entity";

/**
 * Classe de base pour chaque service de l'API Riot.
 * Elle permet d'avoir la configuration de base pour chaque service,
 * ainsi que des méthodes utilitaires pour formater les URI et faire
 * et gérer des requêtes.
 */
export class RiotApi {
    private readonly baseUri = "https://{region}.api.riotgames.com";

    private readonly defaultHeaders = {
        'X-Riot-Token': environment.riotApiKey,
    };


    public getRegionContinent(region: RiotPlatformRegion): RiotRegionContinent {
        switch(region) {
            case RiotPlatformRegion.EUW:
            case RiotPlatformRegion.EUN:
                return RiotRegionContinent.Europe;

            case RiotPlatformRegion.NA:
            case RiotPlatformRegion.LA:
            case RiotPlatformRegion.LA2:
            case RiotPlatformRegion.BR:
                return RiotRegionContinent.Americas;

            case RiotPlatformRegion.JP:
            case RiotPlatformRegion.KR:
            case RiotPlatformRegion.OC:
            case RiotPlatformRegion.RU:
            case RiotPlatformRegion.TR:
                return RiotRegionContinent.Asia;
        }
    }

    protected formatUri(endpoint: RiotEndpoint, args: Record<string, string>): string {
        const uri = this.baseUri + endpoint;

        return Object.entries(args).reduce((acc, [key, value]) => {
            return acc.replace(`{${key}}`, value);
        }, uri);
    }

    protected async request<T>(uri: string): Promise<T> {
        try {
            const response = await fetch(uri, {
                headers: this.defaultHeaders,
            });

            const data = await this.verifyResponse<T>(response);

            return data;
        }
        catch(error) {
            console.error(error);
            throw new HttpException("Internal server error", 500);
        }
    }

    /**
     * Vérifie la réponse de l'API Riot et retourne les données si la réponse est valide.
     * Sinon, lance une exception HTTP.
     */
    protected async verifyResponse<T>(response: Response): Promise<T> {
        const data = await response.json();

        if(!response.ok) {
            const error = data as RiotErrorResponse;
            throw new HttpException(error.status.message, error.status.status_code);
        }

        return data as T;
    }
}
