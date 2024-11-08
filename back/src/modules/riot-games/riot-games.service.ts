import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomUUID } from 'node:crypto';
import { RiotPlatformRegion, RiotRegionContinent } from 'src/modules/riot-games/api/constants/regions';
import { riotApiVersions } from 'src/modules/riot-games/api/constants/riot-api-versions';
import { RiotEndpoint } from 'src/modules/riot-games/api/enums/riot-api-endpoints';
import { RiotApiFetcher } from 'src/modules/riot-games/common/riot-api-fetcher';
import { getRiotRegionContinent } from 'src/modules/riot-games/common/riot-api.helper';
import { IRiotApiAccountResponse } from 'src/modules/riot-games/dto/riot.dto';
import { RiotAccount } from 'src/modules/riot-games/schemas/riot-account.schema';

@Injectable()
export class RiotService extends RiotApiFetcher {
    public constructor(
        @InjectModel(RiotAccount.name) private readonly riotAccountModel: Model<RiotAccount>,
    ) {
        super();
    }

    // --------------------------------------------------------------------------------------------
    // public methods

    public async fetchPlayerByName(region: RiotPlatformRegion, name: string, tag: string, forceRefresh: boolean = true): Promise<RiotAccount> {
        const continent = getRiotRegionContinent(region);

        // recherche d'un compte existant dans la base locale
        const savedAccount = await this.riotAccountModel.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') },
            tag: { $regex: new RegExp(`^${tag}$`, 'i') },
            region
        }).lean().select('-_id');

        // existe et pas de rafraîchissement forcé
        if(savedAccount && !forceRefresh) {
            return savedAccount;
        }

        // mise à jour d'un compte existant
        if(savedAccount) {
            const account = await this.getPlayerAccountByPuuid(continent, savedAccount.puuid);

            const model: RiotAccount = new RiotAccount({
                ...savedAccount,
                name: account.gameName,
                tag: account.tagLine,
                lastUpdated: new Date(),
            });

            await this.riotAccountModel.updateOne({ uuid: savedAccount.uuid }, model);

            return model;
        }
        // création d'un nouveau compte
        else {
            const account = await this.getPlayerAccountByName(continent, name, tag);

            const model: RiotAccount = new RiotAccount({
                uuid: savedAccount?.uuid || randomUUID(),
                lastUpdated: new Date(),
                puuid: account.puuid,
                name: account.gameName,
                tag: account.tagLine,
                region,
            });

            await this.riotAccountModel.create(model);

            return model;
        }
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
    private async getPlayerAccountByPuuid(region: RiotRegionContinent, puuid: string): Promise<IRiotApiAccountResponse> {
        const data = await this.request<IRiotApiAccountResponse>(RiotEndpoint.summonerAccountByPuuid, {
            version: riotApiVersions.account,
            region,
            puuid,
        });
        return data;
    }
}
