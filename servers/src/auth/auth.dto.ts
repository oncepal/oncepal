import { IsString, IsNumber, IsNotEmpty, Length } from 'class-validator';
export class SignInDto {
    @Length(11,11,{message:'请输入11位手机号码'})
    @IsString()
    phoneNumber:string
}

export class WXSignInDto{
    @Length(11,11,{message:'请输入11位code'})
    @IsString()
    code:string

    @Length(11,11,{message:'请输入11位appid'})
    @IsString()
    appId:string
}
export class RegisterDto {
    @Length(11)
    @IsString()
    phoneNumber:string
}