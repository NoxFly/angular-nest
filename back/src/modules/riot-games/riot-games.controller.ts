import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RiotPlatformRegion } from 'src/modules/riot-games/api/constants/regions';
import { RiotService } from 'src/modules/riot-games/riot-games.service';
import { RiotAccount } from 'src/modules/riot-games/schemas/riot-account.schema';

@ApiTags('Riot')
@Controller('riot')
@UseGuards(AuthGuard)
export class RiotController {
    public constructor(
        private readonly riotService: RiotService,
    ) {}

    /**
     * Retrouve un joueur par son nom d'invocateur, son tag et sa région.
     * Le cache dans une base de données.
     * Si ce joueur n'existe pas, throw une erreur.
     * Si ce joueur était déjà caché, le retourne directement depuis la base de données.
     */
    @ApiQuery({ name: 'region', enum: RiotPlatformRegion })
    @ApiOperation({ description: 'Retrouve un compte Riot (joueur) par son pseudo, son tag et sa région' })
    @ApiResponse({ status: 200, description: 'Compte trouvé' })
    @ApiResponse({ status: 401, description: 'Non autorisé' })
    @ApiResponse({ status: 404, description: 'Compte introuvable' })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('search')
    public async searchPlayer(
        @Query('region') region: RiotPlatformRegion,
        @Query('name') name: string,
        @Query('tag') tag: string
    ): Promise<RiotAccount> {
        const account = await this.riotService.fetchPlayerByName(region, name, tag);
        return account;
    }
}
