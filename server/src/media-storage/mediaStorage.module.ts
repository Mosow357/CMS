import { Module } from '@nestjs/common';
import { MediaStorageService } from './services/mediaStorage.service';
import { MockMediaStorageProviderImpl } from './adapters/mockMediaStorageProviderImpl';

@Module({
  imports: [],
  controllers: [],
  providers: [MockMediaStorageProviderImpl,MediaStorageService, ],
  exports: [MediaStorageService],
})
export class MediaStorageModule {}
