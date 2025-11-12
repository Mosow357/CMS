import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';


@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialsRepository: Repository<Testimonial>,
  ) {}

  async create(createTestimonialDto: CreateTestimonialDto): Promise<Testimonial> {
    const testimonial = this.testimonialsRepository.create(createTestimonialDto);
    return this.testimonialsRepository.save(testimonial);
  }

  async findAll(): Promise<Testimonial[]> {
    return this.testimonialsRepository.find({
      relations: ['user', 'category', 'tags'],
    });
  }

  async findOne(id: number): Promise<Testimonial> {
    const testimonial = await this.testimonialsRepository.findOne({
      where: { id },
      relations: ['user', 'category', 'tags'],
    });
    if (!testimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return testimonial;
  }

  async findByUser(userId: number): Promise<Testimonial[]> {
    return this.testimonialsRepository.find({
      where: { user_id: userId },
      relations: ['user', 'category', 'tags'],
    });
  }

  async findByCategory(categoryId: number): Promise<Testimonial[]> {
    return this.testimonialsRepository.find({
      where: { category_id: categoryId },
      relations: ['user', 'category', 'tags'],
    });
  }

  async update(id: number, updateTestimonialDto: UpdateTestimonialDto): Promise<Testimonial> {
    const testimonial = await this.findOne(id);
    Object.assign(testimonial, updateTestimonialDto);
    return this.testimonialsRepository.save(testimonial);
  }

  async remove(id: number): Promise<void> {
    const testimonial = await this.findOne(id);
    await this.testimonialsRepository.remove(testimonial);
  }
}
