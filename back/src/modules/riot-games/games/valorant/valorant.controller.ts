import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/auth/auth.guard";
import { RiotPlatformRegion } from "src/modules/riot-games/api/constants/regions";
import { ValorantService } from "src/modules/riot-games/games/valorant/valorant.service";
import { ValorantProfile } from "src/modules/riot-games/schemas/valorant/profile.schema";

@ApiTags('Riot', 'Valorant')
@Controller('val')
@UseGuards(AuthGuard)
export class ValorantController {
    public constructor(
        private readonly valService: ValorantService,
    ) {}

    /**
     * Retrouve un joueur par son nom d'invocateur, son tag et sa région.
     * Le cache dans une base de données.
     * Si ce joueur n'existe pas, throw une erreur.
     * Si ce joueur était déjà caché, le retourne directement depuis la base de données.
     */
    @ApiQuery({ name: 'region', enum: RiotPlatformRegion })
    @ApiOperation({ description: 'Retourne le profil d\'un joueur de Valorant' })
    @ApiResponse({ status: 200, description: 'Joueur trouvé' })
    @ApiResponse({ status: 401, description: 'Non autorisé' })
    @ApiResponse({ status: 404, description: 'Joueur introuvable' })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('player/profile')
    public async getPlayerProfile(
        @Query('region') region: RiotPlatformRegion,
        @Query('uuid') uuid: string,
    ): Promise<ValorantProfile> {
        const profile = await this.valService.getPlayerProfile(region, uuid);
        return profile;
    }
}
