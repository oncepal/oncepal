import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
/**
 * @param number 可参与人数
 * @param minAge 可参与最小搭子年龄
 * @param sex 性别 0女性 1男性 2都可以
 */
export type PalLimits = {number:number,minAge:number,sex:number}
export type HitchDocument = HydratedDocument<Hitch>;

@Schema({ timestamps: true })
/**
 * 搭子需求模型
 * @param time 时间 2023-11-30 hh:mm
 * @param location 地点 “大坪”
 * @param description 具体描述介绍 “有没有....”
 * @param images 图片 
 * @param promoterId 发起人的id SylasXu
 * @param palLimits 参与者人数限制 4
 * @param palIds 参与者们的id数组
 * @param paymentMethod 支付方式 0-无需费用 1-承担自己费用
 */
@Schema({ timestamps: true ,toJSON: {
    transform: (doc: HitchDocument, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
    }
} })
export class Hitch {
    @Prop()
    id: string;
    @Prop()
    time: string;
    @Prop()
    location: string;
    @Prop()
    images: Array<string>;
    @Prop()
    description: string;
    @Prop()
    creatorId: string;
    @Prop()
    palIds: Array<string>;
    @Prop( {type:mongoose.Schema.Types.Map})
    palLimits:PalLimits
    @Prop()
    paymentMethod:number
}

export const HitchSchema = SchemaFactory.createForClass(Hitch);