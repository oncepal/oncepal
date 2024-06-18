import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class IdDto {
    @IsString()
    id:string
}