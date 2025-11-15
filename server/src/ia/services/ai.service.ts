import { Injectable } from '@nestjs/common';
import type { IAiProvider } from '../ports/IaiProvider';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';

@Injectable()
export class AiService {
  constructor(private readonly aiProvider: IAiProvider) {}

  async evaluate(input: any, options?: Record<string, any>): Promise<any> {
    return this.aiProvider.evaluate(input, options);
  }
  async evaluateTestimonial(testimonial: Testimonial): Promise<string> {
    //TODO: Implement this.
    const input = testimonial.content;
    const options = {};
    return this.aiProvider.evaluate(input, options);
  }
}
