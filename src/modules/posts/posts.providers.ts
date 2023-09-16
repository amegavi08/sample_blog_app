import { Post } from "../posts/post.entity";
import { POST_REPOSITORY } from "src/core/database/constants";

export const postsProviders = [{
    provide: POST_REPOSITORY,
    useValue: Post,
}];