import { IsNotEmpty, MinLength } from "class-validator";

export class PostDto {

    @IsNotEmpty()
    @MinLength(10)
    readonly title: string;

    @IsNotEmpty()
    readonly body: string;
}