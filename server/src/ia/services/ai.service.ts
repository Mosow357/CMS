import { Injectable } from '@nestjs/common';
import type { IAiProvider } from '../ports/IaiProvider';

@Injectable()
export class AiService {
  constructor(private readonly aiProvider: IAiProvider) {}

  async evaluate(input: any, options?: Record<string, any>): Promise<any> {
    return this.aiProvider.evaluate(input, options);
  }
}
