import { Body, Controller, Delete, Get, NotAcceptableException, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './post.dto';
import { Post as PostEntity } from '../posts/post.entity'

@Controller('posts')
export class PostsController {
    constructor (private readonly postService: PostsService) {}

    @Get()
    async findAll() {
        // get all post in the db
        return await this.postService.findAll();
    }
    
    @Get('id')
    async findOne(@Param('id') id:number): Promise<PostEntity> {
        // find the post with this id
        const post = await this.postService.findOne(id);

        // if the post does'nt exist in the database, throw a 404 erro
        if(!post) {
            throw new NotAcceptableException('This Post doesn\'t exist');
        }
        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // Create a new post and return the newly created post
        return await this.postService.create(post, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param() id:number, @Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // get the numer of rows affected and the updated post
        const { numberOfAffectedRows,updatedPost } = await this.postService.update(id, post, req.user.id);

        // if the number of row affected is zero, 
        // it means the post doesn't exist in our db

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This post does\'t exist');
        }

        // return the updated post
        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id:number, @Request() req) {
        // delete the post with this id
        const deleted = await this.postService.delete(id, req.user.id);

        // if the number of row affected is zero, 
        // then the post doesn't exist in our db

        if (deleted) {
            throw new NotFoundException('This post does\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
