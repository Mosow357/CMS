import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialsController } from './controllers/testimonials.controller';
import { Testimonial } from './entities/testimonial.entity';
import { TestimonialsService } from './services/testimonials.service';
import { AiModule } from 'src/ia/ai.module';
import { MediaStorageModule } from 'src/media-storage/mediaStorage.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testimonial]),
    MulterModule.register({
      dest: './upload',
    }),
    MediaStorageModule,
  ],
  controllers: [TestimonialsController],
  providers: [TestimonialsService, MediaStorageModule],
  exports: [TestimonialsService],
})
export class TestimonialsModule {}
