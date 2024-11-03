import { RiotPlatformRegion, RiotRegionContinent } from "src/modules/riot-games/api/constants/regions";

export function getRiotRegionContinent(region: RiotPlatformRegion): RiotRegionContinent {
    switch(region) {
        case RiotPlatformRegion.EUW:
        case RiotPlatformRegion.EUN:
            return RiotRegionContinent.Europe;

        case RiotPlatformRegion.NA:
        case RiotPlatformRegion.LA:
        case RiotPlatformRegion.LA2:
        case RiotPlatformRegion.BR:
            return RiotRegionContinent.Americas;

        case RiotPlatformRegion.JP:
        case RiotPlatformRegion.KR:
        case RiotPlatformRegion.OC:
        case RiotPlatformRegion.RU:
        case RiotPlatformRegion.TR:
            return RiotRegionContinent.Asia;
    }
}
