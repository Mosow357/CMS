import { IsEnum, IsNotEmpty } from "class-validator";
import { TestimonialStatus } from "../enums/testimonialStatus";

export class ChangeStatusDto {
    @IsNotEmpty({ message: 'Testimonial ID is required' })
    testimonialId: string;
    @IsEnum(TestimonialStatus, { message: 'Status must be a valid TestimonialStatus' })
    @IsNotEmpty({ message: 'Status is required' })
    status: TestimonialStatus;
}