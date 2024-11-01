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
