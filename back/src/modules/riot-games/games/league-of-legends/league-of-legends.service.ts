import { Injectable } from "@nestjs/common";
import { RiotPlatformRegion } from "src/modules/riot-games/api/constants/regions";
import { LoLApiVersions } from "src/modules/riot-games/api/constants/riot-api-versions";
import { RiotEndpoint } from "src/modules/riot-games/api/enums/riot-api-endpoints";
import { RiotApiFetcher } from "src/modules/riot-games/common/riot-api-fetcher";
import { RiotAssetsProvider } from "src/modules/riot-games/common/riot-assets.provider";
import { ILoLApiSummonerProfileResponse, ILoLSummonerDTO } from "src/modules/riot-games/games/league-of-legends/dto/summoner.dto";

@Injectable()
export class LeagueOfLegendsService extends RiotApiFetcher {
    private readonly assetsProvider: RiotAssetsProvider = new RiotAssetsProvider();

    /**
     * Retourne le profil d'un joueur Riot à partir de son puuid.
     */
    public async getSummonerProfile(region: RiotPlatformRegion, uuid: string): Promise<ILoLSummonerDTO> {
        const puuid = uuid; // à enlever quand la base locale sera implémentée

        const profile = await this.request<ILoLApiSummonerProfileResponse>(RiotEndpoint.summonerLolProfile, {
            version: LoLApiVersions.summonerProfile,
            region,
            puuid,
        });

        const summonerProfile: ILoLSummonerDTO = {
            uuid,
            profileIconUrl: this.assetsProvider.getProfileIconUri(profile.profileIconId),
            summonerLevel: profile.summonerLevel,
        };

        return summonerProfile;
    }
}
