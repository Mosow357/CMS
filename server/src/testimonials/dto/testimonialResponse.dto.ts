import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TestimonialResponseDto {

  @ApiProperty({
    description: 'Unique ID of the testimonial',
    example: '0b28b9ad-03c8-472d-8c3a-a21d5f04a6c3'
  })
  id: string;

  @ApiProperty({
    description: 'Name of the client who provided the testimonial',
    example: 'John Doe'
  })
  client_name: string;

  @ApiProperty({
    description: 'Email of the client who provided the testimonial',
    example: 'client_1@example.com'
  })
  client_email: string;

  @ApiProperty({
    description: 'Organization ID for which the testimonial was submitted',
    example: 'org_12345'
  })
  organitation_id: string;

  @ApiProperty({
    description: 'Category ID linked to the testimonial',
    example: 'c0f9c216-2e9d-49b9-836f-3c40a0d7f023'
  })
  category_id: string;

  @ApiProperty({
    description: 'Title of the testimonial',
    example: 'Amazing service!',
  })
  title: string;

  @ApiProperty({
    description: 'Main content of the testimonial',
    example: 'Excellent work and great customer attention.'
  })
  content: string;

  @ApiPropertyOptional({
    description: 'Optional URL of a media asset attached to the testimonial',
    example: 'https://cdn.myapp.com/media/testimonial123.jpg'
  })
  media_url?: string;

  @ApiPropertyOptional({
    description: 'Media type associated with the testimonial',
    example: 'IMAGE',
  })
  media_type?: string;

  @ApiPropertyOptional({
    description: 'Status of the testimonial publication',
    example: 'PUBLISHED'
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Star rating from 1 to 5',
    example: 5
  })
  stars_rating?: number;

  @ApiPropertyOptional({
    description: 'Associated tag IDs',
    example: [
      'ec97b2a3-5b9e-4c11-8ec9-2f7b4e9af8d4',
      '57c4c242-9f67-4d7a-b122-33cf10c1e3d0'
    ]
  })
  tagIds?: string[];

  @ApiPropertyOptional({
    description: 'Category name (optional resolution)',
    example: 'Customer Service'
  })
  category_name?: string;
}