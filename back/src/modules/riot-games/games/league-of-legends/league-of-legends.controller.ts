import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/auth/auth.guard";
import { RiotPlatformRegion } from "src/modules/riot-games/api/constants/regions";
import { ILoLSummonerDTO } from "src/modules/riot-games/games/league-of-legends/dto/summoner.dto";
import { LeagueOfLegendsService } from "src/modules/riot-games/games/league-of-legends/league-of-legends.service";

@ApiTags('Riot', 'League of Legends')
@Controller('lol')
@UseGuards(AuthGuard)
export class LeagueOfLegendsController {
    public constructor(
        private readonly lolService: LeagueOfLegendsService,
    ) {}

    /**
     * Retrouve un joueur par son nom d'invocateur, son tag et sa région.
     * Le cache dans une base de données.
     * Si ce joueur n'existe pas, throw une erreur.
     * Si ce joueur était déjà caché, le retourne directement depuis la base de données.
     */
    @ApiQuery({ name: 'region', enum: RiotPlatformRegion })
    @ApiOperation({ description: 'Retourne le profil d\'un joueur de League of Legends' })
    @ApiResponse({ status: 200, description: 'Joueur trouvé' })
    @ApiResponse({ status: 401, description: 'Non autorisé' })
    @ApiResponse({ status: 404, description: 'Joueur introuvable' })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('summoner/profile')
    public async searchSummoner(
        @Query('region') region: RiotPlatformRegion,
        @Query('uuid') uuid: string,
    ): Promise<ILoLSummonerDTO> {
        const summoner = await this.lolService.getSummonerProfile(region, uuid);
        return summoner;
    }
}
