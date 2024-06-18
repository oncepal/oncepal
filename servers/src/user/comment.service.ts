import { User } from './user.schema';
import { Comments } from './comment.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommentDto,UpdateCommentDto } from './comment.dto';
@Injectable()
export class CommentService {
    constructor(@InjectModel(Comments.name) private model: Model<Comments>) {}

  async create(dto: Partial<CreateCommentDto>) {

    return await this.model.create(dto);
  }
   
  async findOneById(id: string) {
    return await this.model.findById(id).exec();
  }
  async findOneByCommentedUserId(commentedUserId: string) {
    return await  this.model.findOne({commentedUserId}).exec();
  }
  async findOne(user:Record<string,any>) {
    return await  this.model.findOne(user).exec();
  }
  async update( {commentedUserId,commentId}: UpdateCommentDto) {

    const d = await  this.model.findOne({commentedUserId}).exec()
    d.comments = d.comments.filter(v=>v.commentId !=commentId)
    return await this.model.findOneAndUpdate({commentedUserId}, d).exec();
  }
  async delete(id: string) {
    return await this.model.findByIdAndRemove(id).exec();
  }
  async deleteAll() {
    return await this.model.deleteMany();
  }
}