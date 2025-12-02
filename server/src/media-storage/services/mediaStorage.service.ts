import { Injectable } from '@nestjs/common';
import Stream from 'stream';
import { CloudinaryProviderImpl } from '../adapters/cloudinaryProviderImpl';

@Injectable()
export class MediaStorageService {
  constructor(private readonly mediaStorageProvider: CloudinaryProviderImpl) {}

  async uploadFile(
    fileStream: Stream.Readable,
    fileName: string,
  ): Promise<string> {
    return this.mediaStorageProvider.upload_stream(fileStream, fileName);
  }
}
