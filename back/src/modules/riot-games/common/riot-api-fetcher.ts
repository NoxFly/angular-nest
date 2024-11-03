import { HttpException } from "@nestjs/common";
import { formatUri } from "src/_tools/utils";
import { environment } from "src/environment/environment";
import { RiotEndpoint, riotApiBaseUri } from "src/modules/riot-games/api/enums/riot-api-endpoints";
import { IRiotErrorResponse } from "src/modules/riot-games/dto/riot.dto";

/**
 * Classe de base pour chaque service de l'API Riot.
 * Elle permet d'avoir la configuration de base pour chaque service,
 * ainsi que des méthodes utilitaires pour formater les URI et faire
 * et gérer des requêtes.
 */
export abstract class RiotApiFetcher {
    private readonly defaultHeaders = {
        'X-Riot-Token': environment.riotApiKey,
    };

    // --------------------------------------------------------------------------------------------

    protected async request<T>(endpoint: RiotEndpoint, params: Record<string, string>): Promise<T> {
        try {
            const uri: string = formatUri(riotApiBaseUri + endpoint, params);

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
            const error = data as IRiotErrorResponse;
            throw new HttpException(error.status.message, error.status.status_code);
        }

        return data as T;
    }
}
