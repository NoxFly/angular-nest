import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { RiotAssetsProvider } from "src/modules/riot-games/common/riot-assets.provider";

export type LoLSummonerDocument = HydratedDocument<LoLSummoner>;

@Schema({ versionKey: false })
export class LoLSummoner {
    @Prop()
    public uuid: string;

    @Transform(({ value }) => RiotAssetsProvider.getProfileIconUri(value))
    @Prop()
    public profileIconId: number;

    @Prop()
    public level: number;


    public constructor(data: Partial<LoLSummoner>) {
        Object.assign(this, data);
    }
}

export const LoLSummonerSchema = SchemaFactory.createForClass(LoLSummoner);
