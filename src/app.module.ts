import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { StarshipsModule } from './starships/starships.module';
import DatabaseConfig from './database.config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(DatabaseConfig()),
    CharactersModule,
    StarshipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
