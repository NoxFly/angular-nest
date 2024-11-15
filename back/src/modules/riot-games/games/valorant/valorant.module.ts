import { Module } from '@nestjs/common';
import { SharedModule } from 'src/modules/_shared/shared.module';
import { RiotDatabaseModule } from 'src/modules/riot-games/common/riot-database.module';
import { ValorantController } from 'src/modules/riot-games/games/valorant/valorant.controller';
import { ValorantService } from 'src/modules/riot-games/games/valorant/valorant.service';

@Module({
    imports: [
        SharedModule,
        RiotDatabaseModule,
    ],
    providers: [ValorantService,],
    controllers: [ValorantController],
})
export class ValorantModule {}
