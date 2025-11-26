import { Injectable } from '@nestjs/common';
import Stream from 'stream';
import { MockMediaStorageProviderImpl } from '../adapters/mockMediaStorageProviderImpl';

@Injectable()
export class MediaStorageService {
  constructor(private readonly mediaStorageProvider: MockMediaStorageProviderImpl) {}

  async uploadFile(
    fileStream: Stream.Readable,
    fileName: string,
  ): Promise<string> {
    return this.mediaStorageProvider.upload_stream(fileStream, fileName);
  }
}
