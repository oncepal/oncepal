import { Module } from '@nestjs/common';
import { PalService } from './pal.service';
import { PalController } from './pal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hitch, HitchSchema } from './pal.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Hitch.name, schema: HitchSchema }])],
  providers: [PalService],
  controllers: [PalController],
  exports: [PalService],
})
export class PalModule {}