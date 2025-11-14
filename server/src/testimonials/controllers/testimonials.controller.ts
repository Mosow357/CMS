import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';
import { TestimonialsService } from '../services/testimonials.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @Get()
  findAll(
    @Query() param:PaginationDto,
    @Query('userId') userId?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    if (userId) {
      return this.testimonialsService.findByUser(userId);
    }
    if (categoryId) {
      return this.testimonialsService.findByCategory(categoryId);
    }
    return this.testimonialsService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.remove(id);
  }
}
