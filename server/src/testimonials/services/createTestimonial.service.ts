import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from '../entities/testimonial.entity';
import { MediaStorageService } from 'src/media-storage/services/mediaStorage.service';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import Stream from 'stream';

@Injectable()
export class CreateTestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialsRepository: Repository<Testimonial>,
    private readonly mediaStorageService: MediaStorageService,
  ) {}

  async createTestimonialWithMedia(
    createTestimonialDto: CreateTestimonialDto,
    fileStream: Stream.Readable,
    filename: string,
  ): Promise<Testimonial> {
    const testimonial =
      this.testimonialsRepository.create(createTestimonialDto);
    testimonial.status = "pending"
    try {
      let objectFilename = this.generateMediaFilename(
        createTestimonialDto.organitation_id,
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
    testimonial.status = "pending"

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
  
}
