import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old Password',
    example: 'oldPassword1234',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'New Password',
    example: 'NewPassword1234',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  newPassword: string;
}