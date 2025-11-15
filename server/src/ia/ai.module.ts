import { Module } from '@nestjs/common';
import { AiService } from './services/ai.service';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [AiService],
})
export class AiModule {}
