import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialsController } from './controllers/testimonials.controller';
import { Testimonial } from './entities/testimonial.entity';
import { TestimonialsService } from './services/testimonials.service';
import { AiModule } from 'src/ia/ai.module';
import { MediaStorageModule } from 'src/media-storage/mediaStorage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testimonial]),
    AiModule,
    MediaStorageModule,
  ],
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
  exports: [TestimonialsService],
})
export class TestimonialsModule {}
