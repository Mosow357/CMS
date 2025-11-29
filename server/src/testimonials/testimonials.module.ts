import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialsController } from './controllers/testimonials.controller';
import { Testimonial } from './entities/testimonial.entity';
import { TestimonialsService } from './services/testimonials.service';
import { MediaStorageModule } from 'src/media-storage/mediaStorage.module';
import { MulterModule } from '@nestjs/platform-express';
import { CreateTestimonialsService } from './services/createTestimonial.service';
import { MediaStorageService } from 'src/media-storage/services/mediaStorage.service';
import { CloudinaryProviderImpl } from 'src/media-storage/adapters/cloudinaryProviderImpl';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testimonial]),
    MulterModule.register({
      dest: './upload',
    }),
    MediaStorageModule,
  ],
  controllers: [TestimonialsController],
  providers: [TestimonialsService,MediaStorageService,CreateTestimonialsService, CloudinaryProviderImpl],
  exports: [TestimonialsService],
})
export class TestimonialsModule {}
