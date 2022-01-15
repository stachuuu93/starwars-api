import { Query, Resolver } from '@nestjs/graphql';
import { Character } from './characters.model';
import { CharactersService } from './characters.service';

@Resolver((of) => Character)
export class CharactersResolver {
  constructor(private charactersService: CharactersService) {}

  @Query((returns) => [Character])
  characters(): Promise<Character[]> {
    return this.charactersService.findAll();
  }
}
