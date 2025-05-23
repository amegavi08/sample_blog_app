import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION'),
    });
    constructor (private readonly configService: ConfigService) {}

    async upload (fileName: string, file: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: 'amazon-file-upload',
                Key: fileName,
                Body: file,
            }),
        )
    }
}
