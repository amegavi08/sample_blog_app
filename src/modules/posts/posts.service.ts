import { Inject, Injectable} from '@nestjs/common';
import { POST_REPOSITORY } from 'src/core/database/constants';
import { PostDto } from './post.dto';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
    constructor (@Inject(POST_REPOSITORY) private readonly postRepository: typeof Post){}

    async create(post: PostDto, userId): Promise<Post> {
        return await this.postRepository.create<Post>({...post, userId});
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.findAll<Post> ({
            include: [
                { 
                    model: User, 
                    attributes: 
                    {
                        exclude: ['password','createdAt','updatedAt']
                }
                }
            ]
        })
    }

    async findOne(id): Promise<Post> {
        return await this.postRepository.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                }
            ]
        })
    }

    async delete(id, userId) {
        return await this.postRepository.destroy({ where: { id, userId }});
    }

    async update(id, data, userId) {
        const [numberOfAffectedRows, [updatedPost]] = await this.postRepository.update
        (
            {...data}, {where: {id, userId }, returning: true}
        );
        return {numberOfAffectedRows, updatedPost};
    }
}
