import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/characters.entity';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
  ) {}

  create(createCharacterInput: CreateCharacterInput): Promise<Character> {
    const newCharacter = this.charactersRepository.create(createCharacterInput);

    return this.charactersRepository.save(newCharacter);
  }

  findOne(id: number): Promise<Character> {
    return this.charactersRepository.findOneOrFail(id);
  }

  findAll(): Promise<Character[]> {
    return this.charactersRepository.find();
  }

  async update(
    id: number,
    updateCharacterInput: UpdateCharacterInput,
  ): Promise<Character> {
    await this.charactersRepository.update({ id }, { ...updateCharacterInput });
    return this.charactersRepository.findOneOrFail(id);
  }

  async remove(id: number): Promise<Character> {
    const character = await this.charactersRepository.findOneOrFail(id);
    return this.charactersRepository.remove(character);
  }
}
