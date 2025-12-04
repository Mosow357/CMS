import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsIn, IsNumber, IsOptional, IsString, IsUUID, Min, } from "class-validator"

export class QueryParamsDto {
    @ApiProperty({
        description: 'Page number for pagination.',
        example: '1',
        type: 'number',
        default: 1
      })
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(()=>Number)
    page?:number = 1
    
    @ApiProperty({
        description: 'Items per page.',
        example: '10',
        type: 'number',
        default: 10
      })
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(()=>Number)
    itemsPerPage?:number = 10

    @ApiProperty({
        description: 'Sort items by date.',
        example: 'ASC',
        type: 'string',
        default:'ASC'
      })
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    sort?: 'ASC' | 'DESC' = 'ASC'
}