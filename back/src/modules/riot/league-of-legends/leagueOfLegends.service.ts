import { Injectable } from "@nestjs/common";
import { RiotEndpoint, RiotPlatformRegion, RiotRegionContinent } from "src/modules/riot/entities/riot";
import { RiotApiSummonerAccount, RiotApiSummonerProfile } from "src/modules/riot/league-of-legends/dto/summoner.entity";
import { RiotApi } from "src/modules/riot/common/riotApi.base";

@Injectable()
export class RiotLoLApiService extends RiotApi {
    /**
     * Retourne le profil d'un joueur Riot à partir de son puuid.
     */
    public async getSummonerProfile(region: RiotPlatformRegion, puuid: string): Promise<RiotApiSummonerProfile> {
        const uri = this.formatUri(RiotEndpoint.summonerLolProfile, { puuid, region });
        const data = await this.request<RiotApiSummonerProfile>(uri);
        return data;
    }

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
