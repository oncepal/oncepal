import { IsString, IsNumber, IsNotEmpty, IsMongoId } from 'class-validator';
import { Comments } from './comment.schema'

export class CreateCommentDto {
    /**
   * 评论内容
   */
    @IsNotEmpty()
    @IsString()
    comment: string;
    /**
     * 评论人ID
     */
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    commentatorId: string;
    /**
     * 被评论人ID
     */
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    commentedUserId: string;

}

export class UpdateCommentDto extends CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    commentedUserId: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    commentId: string;

}


