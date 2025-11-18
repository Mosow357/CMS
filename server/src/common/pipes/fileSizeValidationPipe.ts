import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const maxSizeMb = 30;
    
    const maxSize = 1000 * 1000 * maxSizeMb;
    return value.size < maxSize;
  }
}
