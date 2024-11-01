import { RiotPlatformRegion, RiotRegionContinent } from "src/modules/riot/entities/api/riot.entity";

// stocké dans la base de données locale de cache
export interface RiotSummoner {
    uuid: string;
    puuid: string;
    id: string;
    profileIconId: number;
    summonerLevel: number;
    username: string;
    tag: string;
    platform: RiotPlatformRegion;
    continent: RiotRegionContinent;
}
