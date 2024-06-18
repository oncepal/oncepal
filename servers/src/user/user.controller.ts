import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  UseGuards,
  Req,
  Query,
  Patch,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Header,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CommentService } from './comment.service';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { error } from 'src/common/utils';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly commentService: CommentService) { }

  /**
   * 创建用户
   * @body userInfo 用户信息
   * @returns 创建好的用户信息
   */
  // @UseGuards(AuthGuard)
  @Post()
  @Header('content-type', 'application/json')
  async createUser(@Body() userInfo: CreateUserDto, @Res() res: Response) {
    if (userInfo?.phoneNumber) {
      const existingUser = await this.userService.findOneByPhoneNumber(
        userInfo?.phoneNumber,
      );

      if (!existingUser) {
        const res = this.userService.create(userInfo);
        return res;
      } else {
        return error(res, 500, '已存在该用户！');
      }
    } else return error(res, 500, '缺少手机号！');
  }


  /**
   * 新增用户评论
   * @body commentInfo 评论信息
   * @returns 创建好的评论信息
   */
  // @UseGuards(AuthGuard)
  @Post('/comment')
  @Header('content-type', 'application/json')
  async createComment(@Body() commentInfo: CreateCommentDto, @Res() res: Response) {
    if (!commentInfo?.commentatorId) {
      return error(res, 500, '缺少评论人id！');
    }
    if (!commentInfo?.commentedUserId) {
      return error(res, 500, '缺少被评论人id！');
    }

    return this.commentService.create(commentInfo);

  }


  /**
   * 查询匹配条件的用户
   * @query filter 查询条件
   * @returns 满足条件的用户列表
   */
  @Get()
  async findAll(@Query('filter') filter: string) {
    const f = JSON.parse(filter);
    const r = await this.userService.find(f);
    return r;
  }

  /**
   * 查询用户详情
   * @param id 用户id
   * @returns 用户详情对象
   */
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  /**
   * 修改用户信息
   * @body 用户信息
   * @returns 修改后的用户信息
   */
  // @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() user: UpdateUserDto) {

    const r = await this.userService.update(user);
    if (!r) throw new Error();
    return r;
  }

  /**
   * 删除用户
   * @param id 用户id
   * @returns 删除成功与否
   */
  // @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const r = await this.userService.delete(id);
    return r;
  }
}
