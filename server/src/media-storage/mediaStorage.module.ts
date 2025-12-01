import { Module } from '@nestjs/common';
import { MediaStorageService } from './services/mediaStorage.service';
import { CloudinaryProviderImpl } from './adapters/cloudinaryProviderImpl';

@Module({
  imports: [],
  controllers: [],
  providers: [CloudinaryProviderImpl,MediaStorageService],
  exports: [MediaStorageService],
})
export class MediaStorageModule {}
