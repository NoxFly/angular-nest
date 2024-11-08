import { formatUri } from "src/_tools/utils";
import { lolCurrentVersion } from "src/modules/riot-games/api/constants/riot-api-versions";
import { ddragonBaseUri, ddragonEndpoint } from "src/modules/riot-games/api/enums/ddragon-endpoints";

/**
 * Cette classe permet de retourner les urls des assets de l'écosystème Riot,
 * à partir de leur id de ressource.
 * Utilise DDRAGON, CCDRAGON, ...
 */
export class RiotAssetsProvider {
    public static getProfileIconUri(iconId: number): string {
        return formatUri(`${ddragonBaseUri}/${ddragonEndpoint.profileicon}`, {
            version: lolCurrentVersion,
            iconId: `${iconId}`,
        });
    }
}
