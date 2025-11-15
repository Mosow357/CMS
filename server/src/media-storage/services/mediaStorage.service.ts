import { Injectable } from '@nestjs/common';
import type { IMediaStorageProvider } from '../ports/ImediaStorageProvider';

@Injectable()
export class MediaStorageService {
  constructor(private readonly mediaStorageProvider: IMediaStorageProvider) {}

  async uploadFile(
    fileStream: ReadableStream,
    fileName: string,
  ): Promise<string> {
    return this.mediaStorageProvider.upload_stream(fileStream, fileName);
  }
}
