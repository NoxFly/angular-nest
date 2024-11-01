import { RiotSummoner } from "src/modules/riot/entities/lol.entity";


// type retourné au client
// enlève les données sensibles qui doivent rester serveur à serveur
export type RiotSummonerDTO = Omit<RiotSummoner, 'puuid' | 'id'>;
