import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RiotAccount, RiotAccountSchema } from 'src/modules/riot-games/schemas/riot-account.schema';
import { Summoner, SummonerSchema } from 'src/modules/riot-games/schemas/summoner.schema';
import { environment } from 'src/environment/environment';

@Module({
    imports: [
        MongooseModule.forRoot(environment.mongodbUri),
        MongooseModule.forFeature([
            { name: RiotAccount.name, schema: RiotAccountSchema },
            { name: Summoner.name, schema: SummonerSchema },
        ]),
    ],
    exports: [
        MongooseModule,
    ]
})
export class RiotDatabaseModule {}
