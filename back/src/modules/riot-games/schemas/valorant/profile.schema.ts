import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ValorantDocument = HydratedDocument<ValorantProfile>;

@Schema({ versionKey: false })
export class ValorantProfile {
    @Prop()
    public uuid: string;


    public constructor(data: Partial<ValorantProfile>) {
        Object.assign(this, data);
    }
}

export const ValorantProfileSchema = SchemaFactory.createForClass(ValorantProfile);
