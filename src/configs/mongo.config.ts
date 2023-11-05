import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = (configService: ConfigService): MongooseModuleOptions => {
  return {
    uri: configService.get('MONGODB_URI'),
    dbName: configService.get('MONGODB_DB_NAME'),
    auth: {
      username: configService.get('MONGODB_USERNAME'),
      password: configService.get('MONGODB_PASSWORD'),
    },
  };
};
