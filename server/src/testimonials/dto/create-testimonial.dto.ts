import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsArray, IsEnum, MinLength, MaxLength, IsInt, Min, Max } from 'class-validator';
import { MediaType } from '../enums/mediaType';
import { TestimonialStatus } from '../enums/testimonialStatus';
import { Type } from 'class-transformer';

export class CreateTestimonialDto {
  
  @IsString()
  @IsNotEmpty({ message: 'Organization ID is required' })
  organitation_id: string;

  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Category ID is required' })
  category_id: string;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(255, { message: 'Title cannot exceed 255 characters' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Media URL cannot exceed 500 characters' })
  media_url?: string;

  @IsOptional()
  @IsEnum(MediaType, { message: 'Media type must be: image, video or audio' })
  media_type: MediaType;

  @IsOptional()
  @IsEnum(TestimonialStatus, { message: 'Status must be: pending, approved, rejected or published' })
  status?: TestimonialStatus;

  @IsOptional()
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Minimum rating is 1' })
  @Max(5, { message: 'Maximum rating is 5' })
  @Type(() => Number)
  stars_rating?: number;

  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  @IsUUID('4', { each: true, message: 'Each tag must be a valid UUID' })
  tagIds?: string[];
}