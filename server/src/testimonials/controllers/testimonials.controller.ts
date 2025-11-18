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
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';
import { TestimonialsService } from '../services/testimonials.service'; 
import { QueryParamsDto } from 'src/common/dto/queryParams.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateTestimonialsService } from '../services/createTestimonial.service';
import { FileSizeValidationPipe } from 'src/common/pipes/fileSizeValidationPipe';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService,private readonly createTestimonialService:CreateTestimonialsService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createTestimonialDto: CreateTestimonialDto,@UploadedFile(new FileSizeValidationPipe()) file?: Express.Multer.File) {
    if(createTestimonialDto.media_type == "text" || !file)
      return this.createTestimonialService.createTestimonial(createTestimonialDto);

    return this.createTestimonialService.createTestimonialWithMedia(createTestimonialDto, file.stream, file.originalname);
  }

  @Get()
  findAll(
    @Query() param:QueryParamsDto,
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
