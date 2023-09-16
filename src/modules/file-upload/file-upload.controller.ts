import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
    
    constructor ( private readonly fileUploadService: FileUploadService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
                // new MaxFileSizeValidator({ maxSize: 1000 }),
                // new FileTypeValidator({ fileType: 'image/jpeg'})
            ],
        })
    ) file: Express.Multer.File) {
        // console.log(file)
        await this.fileUploadService.upload(file.originalname, file.buffer);
    }
}
