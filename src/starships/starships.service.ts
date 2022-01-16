import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStarshipInput } from './dto/create-starship.input';
import { UpdateStarshipInput } from './dto/update-starship.input';
import { Starship } from './entities/starship.entity';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,
  ) {}

  create(createStarshipInput: CreateStarshipInput): Promise<Starship> {
    const newStarship = this.starshipsRepository.create(createStarshipInput);
    return this.starshipsRepository.save(newStarship);
  }

  findAll(): Promise<Starship[]> {
    return this.starshipsRepository.find();
  }

  findOne(id: number): Promise<Starship> {
    return this.starshipsRepository.findOneOrFail(id);
  }

  async update(
    id: number,
    updateStarshipInput: UpdateStarshipInput,
  ): Promise<Starship> {
    await this.starshipsRepository.update({ id }, { ...updateStarshipInput });
    return this.starshipsRepository.findOneOrFail(id);
  }

  async remove(id: number): Promise<Starship> {
    const starship = await this.starshipsRepository.findOneOrFail(id);
    return this.starshipsRepository.remove(starship);
  }

  pickRandom(limit = 1): Promise<Starship[]> {
    return this.starshipsRepository
      .createQueryBuilder()
      .orderBy('RANDOM()')
      .limit(limit)
      .getMany();
  }
}
