import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TestimonialStatus } from "../enums/testimonialStatus";
import { QueryParamsDto } from "src/common/dto/queryParams.dto";

export class TestimonialsParamsDto extends QueryParamsDto {
  @ApiProperty({
    description: 'ID of the organization to get testimonials.',
    example: 'org_12345',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty({ message: 'Organization ID is required' })
  organitationId?: string;

  @ApiPropertyOptional({
    description: 'Status to filter testimonials (e.g., approved, pending, rejected,published).',
    example: 'approved',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  status?: TestimonialStatus;
}