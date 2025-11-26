import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString, Min, } from "class-validator"

export class QueryParamsDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(()=>Number)
    page?:number = 20
    
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(()=>Number)
    itemsPerPage?:number = 0

    @IsOptional()
    @IsString()
    sort: 'ASC' | 'DESC'
}