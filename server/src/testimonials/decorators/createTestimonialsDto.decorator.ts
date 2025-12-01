import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
export function ApiFileWithDto(dto: Type<any>, fileField: string = 'file') {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiExtraModels(dto),
    ApiBody({
      schema: {
        allOf: [
          // Aquí va el esquema del DTO
          { $ref: getSchemaPath(dto) },
          // Aquí agregamos el campo de archivo encima
          {
            type: 'object',
            properties: {
              [fileField]: {
                type: 'string',
                format: 'binary',
              },
            },
          },
        ],
      },
    }),
  );
}