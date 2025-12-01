import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
export function ApiFileWithDto(dto: Type<any>, fileField: string = 'file') {
  return applyDecorators(
    ApiExtraModels(dto),
    ApiBody({
      schema: {
        allOf: [
          { $ref: getSchemaPath(dto) },
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