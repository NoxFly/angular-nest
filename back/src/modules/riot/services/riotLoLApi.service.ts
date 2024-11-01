import { Injectable } from "@nestjs/common";
import { RiotEndpoint, RiotPlatformRegion } from "src/modules/riot/entities/api/riot.entity";
import { RiotApiSummonerProfile } from "src/modules/riot/entities/api/riot.lol.entity";
import { RiotApi } from "src/modules/riot/services/riot.api";

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
}
