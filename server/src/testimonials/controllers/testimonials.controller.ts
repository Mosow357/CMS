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
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';
import { TestimonialsService } from '../services/testimonials.service'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTestimonialsService } from '../services/createTestimonial.service';
import { Public } from 'src/common/guards/roles.decorator';
import { MediaType } from '../enums/mediaType';
import { TestimonialsParamsDto } from '../dto/testimonials.params.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Testimonial } from '../entities/testimonial.entity';
import { TestimonialResponseDto } from '../dto/testimonialResponse.dto';
import { ApiFileWithDto } from '../decorators/createTestimonialsDto.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService,private readonly createTestimonialService:CreateTestimonialsService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a testimonial with or without media attachment' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file',{}))
  create(@Body() createTestimonialDto: CreateTestimonialDto, @UploadedFile(new ParseFilePipeBuilder().addMaxSizeValidator({ maxSize: 2048 }).build({
      fileIsRequired: false,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),) file?: Express.Multer.File) {
    if (createTestimonialDto.media_type == MediaType.TEXT || !file)
      return this.createTestimonialService.createTestimonial(createTestimonialDto);

    return this.createTestimonialService.createTestimonialWithMedia(createTestimonialDto, file.stream, file.originalname);
  }



  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve a list of testimonials with optional filtering and pagination' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TestimonialResponseDto,
    isArray: true,
  })
  findAll(
    @Query() param: TestimonialsParamsDto,
    @GetUser() user
  ): Promise<Testimonial[]> {
    return this.testimonialsService.findAll(param,user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.remove(id);
  }
}
