import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 3,
    }),
  ],
  providers: [FileUploadService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  controllers: [FileUploadController]
})
export class FileUploadModule {}
