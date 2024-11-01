import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { RiotPlatformRegion } from 'src/modules/riot/entities/api/riot.entity';
import { RiotSummonerDTO } from 'src/modules/riot/dto/lol.dto';
import { RiotService } from 'src/modules/riot/riot.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';

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
    @ApiResponse({ status: 200, description: 'User found and returned' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Get('summoner/:region/:name/:tag')
    public async getSummonerByName(
        @Param('region') region: RiotPlatformRegion,
        @Param('name') name: string,
        @Param('tag') tag: string
    ): Promise<RiotSummonerDTO> {
        const summoner = await this.riotService.fetchSummoner(region, name, tag);
        return summoner;
    }
}
