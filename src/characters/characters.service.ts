import { Injectable } from '@nestjs/common';
import { Character } from './characters.model';

@Injectable()
export class CharactersService {
  async findAll(): Promise<Character[]> {
    const character = new Character();
    character.id = 1;
    character.name = 'Luke Skywalker';
    character.height = 180;
    character.mass = 90;
    character.gender = 'male';
    return [character];
  }
}
