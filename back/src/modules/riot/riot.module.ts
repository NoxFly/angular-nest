import { Module } from '@nestjs/common';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { RiotController } from 'src/modules/riot/riot.controller';
import { RiotService } from 'src/modules/riot/riot.service';
import { RiotApiService } from 'src/modules/riot/services/riotApi.service';
import { RiotLoLApiService } from 'src/modules/riot/services/riotLoLApi.service';

@Module({
    imports: [SharedModule],
    providers: [
        RiotService,
        RiotApiService,
        RiotLoLApiService
    ],
    controllers: [RiotController]
})
export class RiotModule {}
