import { Injectable } from '@nestjs/common';
import Stream from 'stream';
import { cloudinaryProviderImpl } from '../adapters/cloudinaryProviderImpl';

@Injectable()
export class MediaStorageService {
  constructor(private readonly mediaStorageProvider: cloudinaryProviderImpl) {}

  async uploadFile(
    fileStream: Stream.Readable,
    fileName: string,
  ): Promise<string> {
    return this.mediaStorageProvider.upload_stream(fileStream, fileName);
  }
}
