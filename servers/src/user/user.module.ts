import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Comments, CommentsSchema } from './comment.schema';
import { CommentService } from './comment.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema, }, { name: Comments.name, schema: CommentsSchema }])],
  controllers: [UserController],
  providers: [UserService, CommentService],
  exports: [UserService, CommentService]
})
export class UserModule { }
