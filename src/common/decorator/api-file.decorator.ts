import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function ApiFile(fileName: string = 'file', localOptions?: MulterOptions) {
  return applyDecorators(ApiConsumes('multipart/form-data'), UseInterceptors(FileInterceptor(fileName, localOptions)));
}
