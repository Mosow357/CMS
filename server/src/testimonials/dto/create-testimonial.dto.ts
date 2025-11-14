import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsArray } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'User ID' })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'Category ID', required: false })
  @IsUUID()
  @IsOptional()
  category_id?: string;

  @ApiProperty({ example: 'Great service!', description: 'Testimonial title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Amazing experience...', description: 'Testimonial content', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: 'Media URL', required: false })
  @IsString()
  @IsOptional()
  media_url?: string;

  @ApiPropertyOptional({ example: 'image', description: 'Media type (image, video, etc.)', required: false })
  @IsString()
  @IsOptional()
  media_type?: string;

  @ApiPropertyOptional({ example: 'published', description: 'Status (draft, published, etc.)', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: ['123e4567-e89b-12d3-a456-426614174002', '123e4567-e89b-12d3-a456-426614174003'], description: 'Tag IDs', required: false })
  @IsArray()
  @IsOptional()
  tagIds?: string[];
}
