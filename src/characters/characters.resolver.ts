import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Character } from './characters.model';
import { CharactersService } from './characters.service';
import { CreateCharacterInput } from './dto/create-character.input';

@Resolver((of) => Character)
export class CharactersResolver {
  constructor(private charactersService: CharactersService) {}

  @Query((returns) => [Character])
  characters(): Promise<Character[]> {
    return this.charactersService.findAll();
  }

  @Mutation((returns) => Character)
  createCharacter(
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
  ): Promise<Character> {
    return this.charactersService.createCharacter(createCharacterInput);
  }
}
