export interface IMediaStorageProvider {
  upload_stream(stream: ReadableStream, filename: string): Promise<string>;
}
