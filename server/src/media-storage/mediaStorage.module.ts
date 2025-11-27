import { Module } from '@nestjs/common';
import { MediaStorageService } from './services/mediaStorage.service';
import { cloudinaryProviderImpl } from './adapters/cloudinaryProviderImpl';

@Module({
  imports: [],
  controllers: [],
  providers: [cloudinaryProviderImpl,MediaStorageService],
  exports: [MediaStorageService],
})
export class MediaStorageModule {}
