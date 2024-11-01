import { Exclude } from "class-transformer";
import { Entity } from "src/modules/_shared/entities/entity";
import { RiotPlatformRegion, RiotRegionContinent } from "src/modules/riot/entities/riot.entity";

// Les interfaces de réponse de l'API de Riot Games
export interface RiotApiSummonerAccount {
    puuid: string;
    gameName: string;
    tagLine: string;
}

export interface RiotApiSummonerProfile {
    id: string;
    accountId: string;
    puuid: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}


// L'entité qui est retournée par l'application au client

export class RiotSummonerDTO extends Entity {
    public uuid: string;

    @Exclude()
    public puuid: string;

    @Exclude()
    public id: string;

    public profileIconId: number;
    public summonerLevel: number;
    public username: string;
    public tag: string;
    public platform: RiotPlatformRegion;
    public continent: RiotRegionContinent;
}
