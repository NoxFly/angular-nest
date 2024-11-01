import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { RiotPlatformRegion } from 'src/modules/riot/entities/riot.entity';
import { RiotLoLApiService } from 'src/modules/riot/league-of-legends/leagueOfLegends.service';
import { RiotSummonerDTO } from 'src/modules/riot/league-of-legends/dto/summoner.entity';

@Injectable()
export class RiotService {
    public constructor(
        private readonly lolApi: RiotLoLApiService,
    ) {}

    // --------------------------------------------------------------------------------------------
    // public methods

    public async fetchSummonerByName(region: RiotPlatformRegion, name: string, tag: string): Promise<RiotSummonerDTO> {
        const continent = this.lolApi.getRegionContinent(region);

        // TODO : check cache for summoner

        // ## if summoner not in cache ##
        const account = await this.lolApi.getSummonerByName(continent, name, tag);
        const profile = await this.lolApi.getSummonerProfile(region, account.puuid);

        const summoner: RiotSummonerDTO = new RiotSummonerDTO({
            uuid: randomUUID(),
            puuid: account.puuid,
            id: profile.id,
            profileIconId: profile.profileIconId,
            summonerLevel: profile.summonerLevel,
            username: account.gameName,
            tag: account.tagLine,
            platform: region,
            continent: continent,
        });

        // TODO : save to cache summonerInDB

        // ## END OF summoner not in cache ##

        return summoner;
    }
}
