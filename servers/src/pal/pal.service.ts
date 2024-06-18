import { Hitch, HitchDocument } from './pal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateHitchDto,UpdateHitchDto } from './pal.dto';
@Injectable()
export class PalService {
    constructor(@InjectModel(Hitch.name) private model: Model<Hitch>) {}

  async create(pal: Partial<CreateHitchDto>) {

    return await this.model.create(pal);
  }
   async find(pal?:{}) {
    const pals = await this.model.find(pal).exec();
    
    return pals;
   
  } 
  async findOneById(id: string) {
    return await this.model.findById(id).exec();
  }
  async findOneByPhoneNumber(phoneNumber: string) {
    return await  this.model.findOne({phoneNumber}).exec();
  }
  async findOne(pal:Record<string,any>) {
    return await  this.model.findOne(pal).exec();
  }
  async update( pal: UpdateHitchDto) {
    return await this.model.findByIdAndUpdate(pal.id, pal, { new: true }).exec();
  }
  async delete(id: string) {
    return await this.model.findByIdAndRemove(id).exec();
  }
  async deleteAll() {
    return await this.model.deleteMany();
  }
}