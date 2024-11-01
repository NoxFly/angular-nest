import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { RiotPlatformRegion } from 'src/modules/riot/entities/api/riot.entity';
import { RiotSummonerDTO } from 'src/modules/riot/dto/lol.dto';
import { RiotApiService } from 'src/modules/riot/services/riotApi.service';
import { RiotLoLApiService } from 'src/modules/riot/services/riotLoLApi.service';
import { RiotSummoner } from 'src/modules/riot/entities/lol.entity';

@Injectable()
export class RiotService {
    public constructor(
        private readonly riotApi: RiotApiService,
        private readonly lolApi: RiotLoLApiService,
    ) {}

    // --------------------------------------------------------------------------------------------
    // public methods

    public async fetchSummoner(region: RiotPlatformRegion, name: string, tag: string): Promise<RiotSummonerDTO> {
        const continent = this.riotApi.getRegionContinent(region);

        // TODO : check cache for summoner

        // ## if summoner not in cache ##
        const account = await this.riotApi.getSummonerByName(continent, name, tag);
        const profile = await this.lolApi.getSummonerProfile(region, account.puuid);

        const summoner: RiotSummonerDTO = {
            uuid: randomUUID(),
            profileIconId: profile.profileIconId,
            summonerLevel: profile.summonerLevel,
            username: account.gameName,
            tag: account.tagLine,
            platform: region,
            continent: continent,
        };

        const summonerInDB: RiotSummoner = {
            ...summoner,
            puuid: account.puuid,
            id: profile.id,
        };

        // TODO : save to cache summonerInDB

        // ## END OF summoner not in cache ##

        return summoner;
    }
}
