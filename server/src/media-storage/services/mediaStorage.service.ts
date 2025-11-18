import { Inject, Injectable } from '@nestjs/common';
import Stream from 'stream';
import { IMediaStorageProvider } from '../ports/ImediaStorageProvider';

@Injectable()
export class MediaStorageService {
  constructor(@Inject(IMediaStorageProvider) private readonly mediaStorageProvider: IMediaStorageProvider) {}

  async uploadFile(
    fileStream: Stream.Readable,
    fileName: string,
  ): Promise<string> {
    return this.mediaStorageProvider.upload_stream(fileStream, fileName);
  }
}
