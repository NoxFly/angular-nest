import { HttpStatus } from "@nestjs/common";

export enum RiotEndpoint {
    summonerAccountByName = "/riot/account/v1/accounts/by-riot-id/{name}/{tag}",
    summonerAccountByPuuid = "/riot/account/v1/accounts/by-puuid/{puuid}",
    summonerLolProfile = "/lol/summoner/v4/summoners/by-puuid/{puuid}"
}

export enum RiotRegionContinent {
    Europe = "europe",
    Americas = "americas",
    Asia = "asia",
}

export enum RiotPlatformRegion {
    EUW = "EUW1",
    EUN = "EUN1",
    NA = "NA1",
    KR = "KR",
    JP = "JP1",
    RU = "RU",
    LA = "LA1",
    LA2 = "LA2",
    OC = "OC1",
    TR = "TR1",
    BR = "BR1"
}

export interface IRiotErrorResponse {
    status:  {
        status_code: HttpStatus;
        message: string;
    }
}
