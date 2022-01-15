import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './characters.model';
import { CreateCharacterInput } from './dto/create-character.input';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
  ) {}

  createCharacter(
    createCharacterInput: CreateCharacterInput,
  ): Promise<Character> {
    const newCharacter = this.charactersRepository.create(createCharacterInput);

    return this.charactersRepository.save(newCharacter);
  }

  async findAll(): Promise<Character[]> {
    return this.charactersRepository.find();
  }
}
