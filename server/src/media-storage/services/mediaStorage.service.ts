import { Injectable } from '@nestjs/common';
import Stream from 'stream';
import { CloudinaryProviderImpl } from '../adapters/cloudinaryProviderImpl';

@Injectable()
export class MediaStorageService {
  constructor(private readonly mediaStorageProvider: CloudinaryProviderImpl) {}

  async uploadFile(
    file: Express.Multer.File,
    fileName: string,
  ): Promise<string> {
    return this.mediaStorageProvider.upload_stream(file, fileName);
  }
}
