import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { RiotPlatformRegion } from "src/modules/riot-games/api/constants/regions";

export type RiotAccountDocument = HydratedDocument<RiotAccount>;

@Schema({ versionKey: false })
export class RiotAccount {
    // ID Riot à garder privé de serveur à serveur
    @Exclude()
    @Prop()
    public puuid: string;

    // ID interne à l'application
    @Prop()
    public uuid: string;

    @Prop()
    public lastUpdated: Date;

    // Propriétés publiques
    @Prop()
    public name: string;

    @Prop()
    public tag: string;

    @Prop({ type: String, enum: RiotPlatformRegion })
    public region: RiotPlatformRegion;


    public constructor(data: Partial<RiotAccount>) {
        Object.assign(this, data);
    }
}

export const RiotAccountSchema = SchemaFactory.createForClass(RiotAccount);
