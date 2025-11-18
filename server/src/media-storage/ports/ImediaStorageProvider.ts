import Stream from 'stream';
export interface IMediaStorageProvider {
  upload_stream(stream: Stream.Readable, filename: string): Promise<string>;
}
export const IMediaStorageProvider = Symbol("IMediaStorageProvider");