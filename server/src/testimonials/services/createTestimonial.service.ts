import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from '../entities/testimonial.entity';
import { MediaStorageService } from 'src/media-storage/services/mediaStorage.service';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import Stream from 'stream';
import { AiService } from 'src/ia/services/ai.service';

@Injectable()
export class CreateTestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialsRepository: Repository<Testimonial>,
    private readonly mediaStorageService: MediaStorageService,
    private readonly aiService: AiService,
  ) {}

  async createTestimonialWithMedia(
    createTestimonialDto: CreateTestimonialDto,
    fileStream: Stream.Readable,
    filename: string,
  ): Promise<Testimonial> {
    const testimonial =
      this.testimonialsRepository.create(createTestimonialDto);
    testimonial.status =
      await this.evaluateStatusTestimonialContent(testimonial);
    try {
      let objectFilename = this.generateMediaFilename(
        createTestimonialDto.user_id,
        filename,
      );
      let publicId = await this.mediaStorageService.uploadFile(
        fileStream,
        objectFilename,
      );
      testimonial.media_url = publicId;
      return this.testimonialsRepository.save(testimonial);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to upload media: ${error.message}`,
      );
    }
  }
  async createTestimonial(createTestimonialDto: CreateTestimonialDto) {
    const testimonial =
      this.testimonialsRepository.create(createTestimonialDto);
    testimonial.status =
      await this.evaluateStatusTestimonialContent(testimonial);

    return this.testimonialsRepository.save(testimonial);
  }

  private generateMediaFilename(
    userId: string,
    originalFilename: string,
  ): string {
    const timestamp = Date.now();
    const sanitizedFilename = originalFilename.replace(/\s+/g, '_');
    return `testimonials/${userId}/${timestamp}_${sanitizedFilename}`;
  }
  private async evaluateStatusTestimonialContent(
    testimonial: Testimonial,
  ): Promise<string> {
    let aiEvaluationResult =
      await this.aiService.evaluateTestimonial(testimonial);
    return aiEvaluationResult;
  }
}
