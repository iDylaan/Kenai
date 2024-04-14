import { Module } from '@nestjs/common';
import { KenaiService } from './kenai.service';
import { KenaiController } from './kenai.controller';

@Module({
  providers: [KenaiService],
  controllers: [KenaiController]
})
export class KenaiModule {}
