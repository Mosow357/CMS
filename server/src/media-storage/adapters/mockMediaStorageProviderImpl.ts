import { Injectable } from '@nestjs/common';
import { IMediaStorageProvider } from '../ports/ImediaStorageProvider';
import Stream from 'stream';

@Injectable()
export class MockMediaStorageProviderImpl implements IMediaStorageProvider {
  async upload_stream(
    fileStream: Stream.Readable,
    fileName: string,
  ): Promise<string> {
    return `mocked_url/${fileName}`;
  }
}