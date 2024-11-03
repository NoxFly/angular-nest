export const ddragonStaticBaseUri = "https://ddragon.leagueoflegends.com";

export enum staticDdragonResource {
    versioning = "/api/versions.json",
    languages = "/cdn/languages.json",
    realms = "/realms/{region}.json",
}

export const ddragonBaseUri = "https://ddragon.leagueoflegends.com/cdn";

export enum ddragonEndpoint {
    champions = "/{version}/data/{lang}/champion.json",
    championsFull = "/{version}/data/{lang}/championFull.json",
    champion = "/{version}/data/{lang}/champion/{champion}.json",
    championSplash = "/img/champion/splash/{champion}_{skinNumber}.jpg",
    championSquare = "/{version}/img/champion/{champion}.png",
    championLoading = "/img/champion/loading/{champion}_0.jpg",
    championPassive = "/{version}/img/passive/{spell}",
    championAbility = "/{version}/img/spell/{spell}",

    items = "/{version}/data/{lang}/item.json",
    item = "/{version}/img/item/{item}",
    sprites = "/{version}/img/sprite/spell{n}.png",

    summonerSpells = "/{version}/data/{lang}/summoner.json",
    summonerSpell = "/{version}/img/spell/{spell}.png",

    profileicons = "/{version}/data/{lang}/profileicon.json",
    profileicon = "/{version}/img/profileicon/{iconId}.png",

    perks = "/{version}/data/{lang}/runesReforged.json",
    perkIcon = "/img/{perk}",
}
