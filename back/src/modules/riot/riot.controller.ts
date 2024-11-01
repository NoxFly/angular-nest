import { ClassSerializerInterceptor, Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RiotPlatformRegion } from 'src/modules/riot/entities/riot';
import { RiotService } from 'src/modules/riot/riot.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RiotSummonerDTO } from 'src/modules/riot/league-of-legends/dto/summoner.entity';

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
    @ApiParam({ name: 'region', enum: RiotPlatformRegion })
    @ApiOperation({ description: 'Retrouve un joueur par son nom d\'invocateur, son tag et sa région' })
    @ApiResponse({ status: 200, description: 'Summoner found and returned' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Summoner not found' })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('summoner/:region/:name/:tag')
    public async getSummonerByName(
        @Param('region') region: RiotPlatformRegion,
        @Param('name') name: string,
        @Param('tag') tag: string
    ): Promise<RiotSummonerDTO> {
        const summoner = await this.riotService.fetchSummonerByName(region, name, tag);
        return summoner;
    }
}
