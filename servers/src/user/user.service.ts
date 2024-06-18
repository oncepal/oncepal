import { User } from './user.schema';
import { Comments } from './comment.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto,UpdateUserDto } from './user.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,@InjectModel(Comments.name) private commentModel: Model<Comments>) {}

  async create(user: Partial<CreateUserDto>) {

    return await this.userModel.create(user);
  }
   async find(user?:{}) {
    const users = await this.userModel.find(user).exec();
    return users;

  } 
  async findOneById(id: string) {
    return await this.userModel.findById(id).exec();
  }
  async findOneByPhoneNumber(phoneNumber: string) {
    return await  this.userModel.findOne({phoneNumber}).exec();
  }
  async findOne(user:Record<string,any>) {
    return await  this.userModel.findOne(user).exec();
  }
  async update( user: UpdateUserDto) {
    console.log("user.id",user);
     
    return await this.userModel.findByIdAndUpdate(user.id, user, { new: true }).exec();
  }
  async delete(id: string) {
    return await this.userModel.findByIdAndRemove(id).exec();
  }
  async deleteAll() {
    return await this.userModel.deleteMany();
  }
}