import { Injectable } from "@nestjs/common";
import { RiotEndpoint, RiotPlatformRegion, RiotRegionContinent } from "src/modules/riot/entities/api/riot.entity";
import { RiotApiSummonerAccount } from "src/modules/riot/entities/api/riot.lol.entity";
import { RiotApi } from "src/modules/riot/services/riot.api";

@Injectable()
export class RiotApiService extends RiotApi {
    /**
     * Cherche et retourne un compte de joueur Riot à partir de son nom et tag
     * dans une région donnée.
     */
    public async getSummonerByName(region: RiotRegionContinent, name: string, tag: string): Promise<RiotApiSummonerAccount> {
        const uri = this.formatUri(RiotEndpoint.summonerAccountByName, { region, name, tag });
        const data = await this.request<RiotApiSummonerAccount>(uri);
        return data;
    }

    /**
     * Cherche et retourne un compte de joueur Riot à partir de son puuid
     * dans une région donnée.
     */
    public async getSummonerByPuuid(region: RiotPlatformRegion, puuid: string): Promise<RiotApiSummonerAccount> {
        const uri = this.formatUri(RiotEndpoint.summonerAccountByPuuid, { region, puuid });
        const data = await this.request<RiotApiSummonerAccount>(uri);
        return data;
    }
}
