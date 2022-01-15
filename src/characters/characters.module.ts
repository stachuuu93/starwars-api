import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharactersService } from './characters.service';
import { CharactersResolver } from './characters.resolver';
import { Character } from './entities/characters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharactersService, CharactersResolver],
})
export class CharactersModule {}
