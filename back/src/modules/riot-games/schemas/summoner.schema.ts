import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { RiotAssetsProvider } from "src/modules/riot-games/common/riot-assets.provider";

export type SummonerDocument = HydratedDocument<Summoner>;

@Schema({ versionKey: false })
export class Summoner {
    @Prop()
    public uuid: string;

    @Transform(({ value }) => RiotAssetsProvider.getProfileIconUri(value))
    @Prop()
    public profileIconId: number;

    @Prop()
    public level: number;


    public constructor(data: Partial<Summoner>) {
        Object.assign(this, data);
    }
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner);
