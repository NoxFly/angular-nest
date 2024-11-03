import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { RiotPlatformRegion, RiotRegionContinent } from 'src/modules/riot-games/api/constants/regions';
import { LoLApiVersions, riotApiVersions } from 'src/modules/riot-games/api/constants/riot-api-versions';
import { RiotEndpoint } from 'src/modules/riot-games/api/enums/riot-api-endpoints';
import { RiotApiFetcher } from 'src/modules/riot-games/common/riot-api-fetcher';
import { getRiotRegionContinent } from 'src/modules/riot-games/common/riot-api.helper';
import { IRiotAccount, IRiotApiAccountResponse } from 'src/modules/riot-games/dto/riot.dto';

@Injectable()
export class RiotService extends RiotApiFetcher {
    // --------------------------------------------------------------------------------------------
    // public methods

    public async fetchSummonerByName(region: RiotPlatformRegion, name: string, tag: string): Promise<IRiotAccount> {
        const continent = getRiotRegionContinent(region);

        const account = await this.getPlayerAccountByName(continent, name, tag);

        console.log('Account PUUID : ', account.puuid);

        const playerAccount: IRiotAccount = {
            uuid: randomUUID(),
            username: account.gameName,
            tag: account.tagLine,
            region,
            continent,
        };

        return playerAccount;
    }

    /**
     * Cherche et retourne un compte de joueur Riot à partir de son nom et tag
     * dans une région donnée, à un moment T.
     * Généralement utilisé par un utilisateur client qui cherche un joueur.
     * Le nom et le tag pouvant changer dans le temps, seul son PUUID peut être
     * utilisé plus tard pour retrouver le joueur.
     */
    private async getPlayerAccountByName(region: RiotRegionContinent, name: string, tag: string): Promise<IRiotApiAccountResponse> {
        const data = await this.request<IRiotApiAccountResponse>(RiotEndpoint.summonerAccountByName, {
            version: riotApiVersions.account,
            region,
            name,
            tag,
        });
        return data;
    }

    /**
     * Cherche et retourne un compte de joueur Riot à partir de son puuid
     * dans une région donnée.
     * Utilisé par l'application en interne, lorsqu'un joueur est déjà connu
     * dans la base locale.
     */
    private async getPlayerAccountByPuuid(region: RiotPlatformRegion, puuid: string): Promise<IRiotApiAccountResponse> {
        const data = await this.request<IRiotApiAccountResponse>(RiotEndpoint.summonerAccountByPuuid, {
            version: riotApiVersions.account,
            region,
            puuid,
        });
        return data;
    }
}
