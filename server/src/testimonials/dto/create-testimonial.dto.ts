import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsArray } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 5, description: 'Category ID', required: false })
  @IsInt()
  @IsOptional()
  category_id?: number;

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

  @ApiProperty({ example: [1, 2, 3], description: 'Tag IDs', required: false })
  @IsArray()
  @IsOptional()
  tagIds?: number[];
}
