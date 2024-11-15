import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RiotAccount, RiotAccountSchema } from 'src/modules/riot-games/schemas/riot-account.schema';
import { LoLSummoner, LoLSummonerSchema } from 'src/modules/riot-games/schemas/league-of-legends/summoner.schema';
import { environment } from 'src/environment/environment';
import { ValorantProfile, ValorantProfileSchema } from 'src/modules/riot-games/schemas/valorant/profile.schema';

@Module({
    imports: [
        MongooseModule.forRoot(environment.mongodbUri),
        MongooseModule.forFeature([
            { name: RiotAccount.name, schema: RiotAccountSchema },
            { name: LoLSummoner.name, schema: LoLSummonerSchema },
            { name: ValorantProfile.name, schema: ValorantProfileSchema },
        ]),
    ],
    exports: [
        MongooseModule,
    ]
})
export class RiotDatabaseModule {}
