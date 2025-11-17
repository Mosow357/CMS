import { Module } from '@nestjs/common';
import { MediaStorageService } from './services/mediaStorage.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MediaStorageService],
  exports: [MediaStorageService],
})
export class MediaStorageModule {}
