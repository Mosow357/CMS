import { Injectable } from '@nestjs/common';
import type { IMediaStorageProvider } from '../ports/ImediaStorageProvider';
import Stream from 'stream';

@Injectable()
export class MediaStorageService {
  constructor(private readonly mediaStorageProvider: IMediaStorageProvider) {}

  async uploadFile(
    fileStream: Stream.Readable,
    fileName: string,
  ): Promise<string> {
    return this.mediaStorageProvider.upload_stream(fileStream, fileName);
  }
}
