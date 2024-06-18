import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
export class WeChatInfo  {
    name: string
    account: string
}
export type UserDocument = HydratedDocument<User>;
/**
 * 用户模型
 * @param id id
 * @param wechatInfo 微信信息 
 * @param avatar 头像 
 * @param phoneNumber 手机号 13996092354
 * @param weight 体重 70（kg）
 * @param height 身高 178
 * @param name 用户真实姓名
 * @param birthday 生日 1996-11-13
 * @param age 年龄 26
 * @param sex 1-男 0-女
 * @param introduction 自我介绍
 */

@Schema({ timestamps: true ,toJSON: {
    transform: (doc: UserDocument, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
    }
} })
export class User {
    @Prop()
    id:string
    @Prop()
    avatar: string
    @Prop()
    name: string;
    @Prop()
    wechatInfo: WeChatInfo
    @Prop()
    age: number;
    @Prop()
    phoneNumber: string
    @Prop()
    weight: number;
    @Prop()
    height: number;
    @Prop()
    birthday: string;
    @Prop()
    sex: number;
    @Prop()
    introduction: string;
}

export const UserSchema = SchemaFactory.createForClass(User);