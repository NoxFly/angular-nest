import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RiotPlatformRegion } from "src/modules/riot-games/api/constants/regions";
import { RiotEndpoint } from "src/modules/riot-games/api/enums/riot-api-endpoints";
import { RiotApiFetcher } from "src/modules/riot-games/common/riot-api-fetcher";
import { IValorantApiProfileResponse } from "src/modules/riot-games/games/valorant/dto/val-profile.dto";
import { RiotAccount } from "src/modules/riot-games/schemas/riot-account.schema";
import { ValorantProfile } from "src/modules/riot-games/schemas/valorant/profile.schema";

@Injectable()
export class ValorantService extends RiotApiFetcher {
    public constructor(
        @InjectModel(ValorantProfile.name) private readonly valorantProfileModel: Model<ValorantProfile>,
        @InjectModel(RiotAccount.name) private readonly riotAccountModel: Model<RiotAccount>,
    ) {
        super();
    }

    /**
     * Retourne le profil d'un joueur Riot à partir de son puuid.
     */
    public async getPlayerProfile(region: RiotPlatformRegion, uuid: string, forceRefresh=false): Promise<ValorantProfile> {
        // 1. Recherche profile existant
        const savedProfile = await this.valorantProfileModel.findOne({ uuid }).lean().select('-_id');

        // existe et pas de rafraîchissement forcé
        if(savedProfile && !forceRefresh) {
            return new ValorantProfile({ ...savedProfile });
        }

        // 2. Recherche du compte Riot en local
        const account = await this.riotAccountModel.findOne({ uuid }).lean().select('-_id');

        // 2.a Si le compte n'existe pas, throw une erreur
        if(!account) {
            // TODO : load le compte à la place de throw une erreur
            throw new BadRequestException("Account not registered yet");
        }

        // 3. Recherche du profile du joueur
        const player = await this.request<IValorantApiProfileResponse>(RiotEndpoint.valorantProfile, {
            version: '1',
            region,
            puuid: account.puuid,
        });

        // 4. Création ou mise à jour du profile
        const profile = new ValorantProfile({
            uuid,
        });

        if(savedProfile) {
            await this.valorantProfileModel.updateOne({ uuid }, profile);
        }
        else {
            await this.valorantProfileModel.create(profile);
        }

        return profile;
    }
}
