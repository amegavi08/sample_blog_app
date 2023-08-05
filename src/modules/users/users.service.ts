import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/database/constants';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor (@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {}

    async create (user: UserDto): Promise<User>{
        return await this.userRepository.create<User>(user);
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { username } });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }

    async findOneByPhonenumber(phonenumber: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { phonenumber } });
    }
    

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }
}
