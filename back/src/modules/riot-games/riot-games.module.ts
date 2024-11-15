import { Module } from '@nestjs/common';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { RiotDatabaseModule } from 'src/modules/riot-games/common/riot-database.module';
import { LeagueOfLegendsModule } from 'src/modules/riot-games/games/league-of-legends/league-of-legends.module';
import { ValorantModule } from 'src/modules/riot-games/games/valorant/valorant.module';
import { RiotController } from 'src/modules/riot-games/riot-games.controller';
import { RiotService } from 'src/modules/riot-games/riot-games.service';

@Module({
    imports: [
        SharedModule,
        LeagueOfLegendsModule,
        ValorantModule,
        RiotDatabaseModule,
    ],
    providers: [RiotService],
    controllers: [RiotController],
})
export class RiotModule {}
