import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Character } from './entities/characters.entity';
import { CharactersService } from './characters.service';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Resolver(() => Character)
export class CharactersResolver {
  constructor(private charactersService: CharactersService) {}

  @Query(() => [Character])
  characters(): Promise<Character[]> {
    return this.charactersService.findAll();
  }

  @Query(() => Character)
  character(@Args('id', { type: () => Int }) id: number): Promise<Character> {
    return this.charactersService.findOne(id);
  }

  @Query(() => Character)
  pickRandomCharacter(): Promise<Character> {
    return this.charactersService.pickRandom();
  }

  @Mutation(() => Character)
  createCharacter(
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
  ): Promise<Character> {
    return this.charactersService.create(createCharacterInput);
  }

  @Mutation(() => Character)
  updateCharacter(
    @Args('updateCharacterInput') updateCharacterInput: UpdateCharacterInput,
  ): Promise<Character> {
    return this.charactersService.update(
      updateCharacterInput.id,
      updateCharacterInput,
    );
  }

  @Mutation(() => Character)
  removeCharacter(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Character> {
    return this.charactersService.remove(id);
  }
}
