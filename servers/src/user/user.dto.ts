import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { User } from './user.schema'
import { OmitType, PartialType, IntersectionType } from '@nestjs/mapped-types'
export class CreateUserDto {
    @IsString()
    avatar: string
    @IsString()
    name: string;
    @IsNumber()
    age: number;
    @IsString()
    phoneNumber: string
    @IsNumber()
    weight: number;
    @IsNumber()
    height: number;
    @IsString()
    birthday: string;
    @IsNumber()
    sex: number;
    @IsString()
    introduction: string;
}

export class UpdateUserDto extends CreateUserDto{
    @IsNotEmpty()
    @IsString()
    id:string
   
}


