import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RiotPlatformRegion } from "src/modules/riot-games/api/constants/regions";
import { LoLApiVersions } from "src/modules/riot-games/api/constants/riot-api-versions";
import { RiotEndpoint } from "src/modules/riot-games/api/enums/riot-api-endpoints";
import { RiotApiFetcher } from "src/modules/riot-games/common/riot-api-fetcher";
import { ILoLApiSummonerProfileResponse } from "src/modules/riot-games/games/league-of-legends/dto/summoner.dto";
import { Summoner } from "src/modules/riot-games/schemas/summoner.schema";
import { RiotAccount } from "src/modules/riot-games/schemas/riot-account.schema";

@Injectable()
export class LeagueOfLegendsService extends RiotApiFetcher {
    public constructor(
        @InjectModel(Summoner.name) private readonly summonerModel: Model<Summoner>,
        @InjectModel(RiotAccount.name) private readonly riotAccountModel: Model<RiotAccount>,
    ) {
        super();
    }

    /**
     * Retourne le profil d'un joueur Riot à partir de son puuid.
     */
    public async getSummonerProfile(region: RiotPlatformRegion, uuid: string, forceRefresh=false): Promise<Summoner> {
        // 1. Recherche profile existant
        const savedProfile = await this.summonerModel.findOne({ uuid }).lean().select('-_id');

        // existe et pas de rafraîchissement forcé
        if(savedProfile && !forceRefresh) {
            return new Summoner({ ...savedProfile });
        }

        // 2. Recherche du compte Riot en local
        const account = await this.riotAccountModel.findOne({ uuid }).lean().select('-_id');

        // 2.a Si le compte n'existe pas, throw une erreur
        if(!account) {
            // TODO : load le compte à la place de throw une erreur
            throw new BadRequestException("Account not registered yet");
        }

        // 3. Recherche du profile du joueur
        const summoner = await this.request<ILoLApiSummonerProfileResponse>(RiotEndpoint.summonerLolProfile, {
            version: LoLApiVersions.summonerProfile,
            region,
            puuid: account.puuid,
        });

        // 4. Création ou mise à jour du profile
        const profile = new Summoner({
            uuid,
            profileIconId: summoner.profileIconId,
            level: summoner.summonerLevel,
        });

        if(savedProfile) {
            await this.summonerModel.updateOne({ uuid }, profile);
        }
        else {
            await this.summonerModel.create(profile);
        }

        return profile;
    }
}
