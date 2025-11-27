import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsIn, IsNumber, IsOptional, IsString, IsUUID, Min, } from "class-validator"

export class QueryParamsDto {
    @ApiPropertyOptional({
        description: 'Página actual',
        example: 1,
        minimum: 1,
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page?: number = 1

    @ApiPropertyOptional({
        description: 'Cantidad de registros por página',
        example: 20,
        minimum: 1,
        default: 20,
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    itemsPerPage?: number = 20

    @ApiPropertyOptional({
        description: 'Orden de resultados por fecha de creación',
        enum: ['ASC', 'DESC'],
        example: 'DESC',
        default: 'ASC',
    })
    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    sort?: 'ASC' | 'DESC'

    @ApiPropertyOptional({
        description: 'Filtrar por estado del testimonial',
        enum: ['pending', 'approved', 'rejected', 'published'],
        example: 'approved',
    })
    @IsOptional()
    @IsString()
    @IsIn(['pending', 'approved', 'rejected', 'published'])
    status?: 'pending' | 'approved' | 'rejected' | 'published'

    @ApiPropertyOptional({ format: 'uuid' })
    @IsOptional()
    @IsUUID()
    organizationId?: string;

    @ApiPropertyOptional({ format: 'uuid' })
    @IsOptional()
    @IsUUID()
    categoryId?: string;
}
