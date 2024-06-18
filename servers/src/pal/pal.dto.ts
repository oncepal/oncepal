import { IsString, IsNumber } from 'class-validator';
import { OmitType, PartialType, IntersectionType } from '@nestjs/mapped-types'
import { Hitch } from './pal.schema';


export class UpdateHitchDto extends
    PartialType(Hitch){
}
export class CreateHitchDto extends OmitType(PartialType(Hitch), ['id']) {
}

