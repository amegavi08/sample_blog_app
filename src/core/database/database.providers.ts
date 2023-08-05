import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "./database.config";
import { User } from "src/modules/users/user.entity";
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../database/constants';
import { Post } from "src/modules/posts/post.entity";

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
            config = databaseConfig.development;
            break;
        case TEST:
            config = databaseConfig.test;
            break;
        case PRODUCTION:
            config = databaseConfig.development;
            break;
        default:
            config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User,Post]);
        await sequelize.sync();
        return sequelize;
    },
}];