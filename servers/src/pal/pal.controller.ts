import { Body, Request,Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Delete, Param, Patch, Req, Query } from '@nestjs/common';
import { PalService } from './pal.service';

import { CreateHitchDto,UpdateHitchDto } from './pal.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('pal')
export class PalController {
  constructor(private palService: PalService) {}

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() pal: CreateHitchDto ) {
    return this.palService.create(pal);
  }

/**
   * 查询匹配条件的用户
   * @query filter 查询条件
   * @returns 满足条件的用户列表
   */
@Get('/hitches')
async getAllHitches(@Query('filter') filter: string) {
  const f = JSON.parse(filter)
  const r = await this.palService.find(f)
  return r;
}

/**
 * 获取搭子需求详情
 * @param id 搭子需求id
 * @returns 用户详情对象
 */ 
@Get(':id')
async findOneById(@Param('id') id: string) {
  return await this.palService.findOneById(id);
} 

 
  /**
   * 修改搭子需求信息
   * @body 搭子需求信息
   * @returns 修改后的搭子需求信息
   */
  // @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() hitch: UpdateHitchDto) {
    console.log(hitch);
    
    const r = await this.palService.update(hitch);
    if(!r) throw new Error()
    return r 
  }

  /**
   * 删除搭子需求
   * @param id 搭子需求id
   * @returns 删除成功与否
   */
  // @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const r = await this.palService.delete(id);
    return r
  }
}