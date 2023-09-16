import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class PostDto {

    @ApiProperty({
        description: 'The titleof the post',
        example: 'The plight ig single Fathers in modern Ghana'
    })
    @IsNotEmpty()
    @MinLength(10)
    readonly title: string;

    @ApiProperty({
        description: 'The body of the post',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean et tortor at' + 
        'risus viverra adipiscing at in tellus. Ullamcorper a lacus vestibulum sed arcu. Interdum varius sit amet mattis vulputate enim. ' + 
        'Morbi tempus iaculis urna id. Magna sit amet purus gravida quis blandit turpis cursus. Lorem sed risus ultricies tristique nulla aliquet enim tortor'
    })
    @IsNotEmpty()
    readonly body: string;
}