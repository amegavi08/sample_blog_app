import { Post } from "@nestjs/common";
import { POST_REPOSITORY } from "src/core/database/constants";

export const postsProviders = [{
    provide: POST_REPOSITORY,
    useValue: Post
}];