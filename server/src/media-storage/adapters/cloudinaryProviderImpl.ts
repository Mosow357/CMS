import { Injectable } from '@nestjs/common';
import Stream from 'stream';

@Injectable()
export class CloudinaryProviderImpl {
  async upload_stream(
    fileStream: Stream.Readable,
    fileName: string,
  ): Promise<string> {
    //TODO:Implement
    return `mocked_url/${fileName}`;
  }
}