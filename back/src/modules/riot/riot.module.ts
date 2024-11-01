import { Module } from '@nestjs/common';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { RiotController } from 'src/modules/riot/riot.controller';
import { RiotService } from 'src/modules/riot/riot.service';
import { RiotLoLApiService } from 'src/modules/riot/league-of-legends/leagueOfLegends.service';

@Module({
    imports: [SharedModule],
    providers: [
        RiotService,
        RiotLoLApiService
    ],
    controllers: [RiotController]
})
export class RiotModule {}
