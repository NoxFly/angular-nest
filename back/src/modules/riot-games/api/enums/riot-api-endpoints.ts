export const riotApiBaseUri = "https://{region}.api.riotgames.com";

// données d'un joueur ou d'une région

export enum RiotEndpoint {
    // Riot account
    summonerAccountByName = "/riot/account/v{version}/accounts/by-riot-id/{name}/{tag}",
    summonerAccountByPuuid = "/riot/account/v{version}/accounts/by-puuid/{puuid}",

    // League of legends
    summonerLolProfile = "/lol/summoner/v{version}/summoners/by-puuid/{puuid}",
    summonerLeague = "/lol/league/v{version}/entries/by-summoner/{id}",
    summonerMatchlist = "/lol/match/v{version}/matches/by-puuid/{puuid}/ids",
    summonerMatch = "/lol/match/v{version}/matches/{matchId}",
    summonerLiveGame = "/lol/spectator/v{version}/active-games/by-summoner/{id}",
    summonerChampionMasteries = "/lol/champion-mastery/v{version}/champion-masteries/by-summoner/{id}",
    summonerChallenges = "/lol/challenges/v{version}/player-data/{puuid}",

    championRotation = "/lol/platform/v{version}/champion-rotations",

    // autres jeux...
}

// données statiques du jeu qui ne dépendent pas ni de la région ni d'un joueur pour être lues

export const staticRiotBaseUri = "https://static.developer.riotgames.com/docs/lol";

export enum staticRiotResource {
    queues = "/queues.json",
    maps = "/maps.json",
    gameModes = "/gameModes.json",
}
