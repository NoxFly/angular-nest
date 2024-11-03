import { Module } from '@nestjs/common';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { LeagueOfLegendsController } from 'src/modules/riot-games/games/league-of-legends/league-of-legends.controller';
import { LeagueOfLegendsService } from 'src/modules/riot-games/games/league-of-legends/league-of-legends.service';

@Module({
    imports: [
        SharedModule,
    ],
    providers: [
        LeagueOfLegendsService,
    ],
    controllers: [
        LeagueOfLegendsController
    ]
})
export class LeagueOfLegendsModule {}
