import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StarshipsService } from './starships.service';
import { StarshipsResolver } from './starships.resolver';
import { Starship } from './entities/starship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Starship])],
  providers: [StarshipsResolver, StarshipsService],
})
export class StarshipsModule {}
