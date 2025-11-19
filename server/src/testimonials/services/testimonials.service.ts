import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';
import { QueryParamsDto } from 'src/common/dto/queryParams.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialsRepository: Repository<Testimonial>,
  ) {}

  async findAll(param: QueryParamsDto): Promise<Testimonial[]> {
    const { limit, offset, sort } = param;
    return this.testimonialsRepository.find({
      relations: ['user', 'category', 'tags'],
      skip: offset,
      take: limit,
      order: {
        createdAt: sort,
      },
    });
  }

  async findOne(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialsRepository.findOne({
      where: { id },
      relations: ['user', 'category', 'tags'],
    });
    if (!testimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return testimonial;
  }

  async findByOrganitation(organitationId: string): Promise<Testimonial[]> {
    return this.testimonialsRepository.find({
      where: { organitation_id: organitationId },
      relations: ['category', 'tags'],
    });
  }

  async findByCategory(categoryId: string): Promise<Testimonial[]> {
    return this.testimonialsRepository.find({
      where: { category_id: categoryId },
      relations: ['user', 'category', 'tags'],
    });
  }

  async update(
    id: string,
    updateTestimonialDto: UpdateTestimonialDto,
  ): Promise<Testimonial> {
    const testimonial = await this.findOne(id);
    Object.assign(testimonial, updateTestimonialDto);
    return this.testimonialsRepository.save(testimonial);
  }

  async remove(id: string): Promise<void> {
    const testimonial = await this.findOne(id);
    await this.testimonialsRepository.remove(testimonial);
  }
}
