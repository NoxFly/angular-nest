export interface ILoLApiSummonerProfileResponse {
    id: string;
    accountId: string;
    puuid: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}


export interface ILoLSummonerDTO {
    uuid: string; // uuid interne à l'application

    profileIconUrl: string;
    summonerLevel: number;
}
