import { Module } from '@nestjs/common';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { LeagueOfLegendsModule } from 'src/modules/riot-games/games/league-of-legends/league-of-legends.module';
import { RiotController } from 'src/modules/riot-games/riot-games.controller';
import { RiotService } from 'src/modules/riot-games/riot-games.service';

@Module({
    imports: [
        SharedModule,
        LeagueOfLegendsModule
    ],
    providers: [
        RiotService,
    ],
    controllers: [RiotController],
})
export class RiotModule {}
