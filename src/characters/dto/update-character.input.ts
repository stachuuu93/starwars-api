import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCharacterInput } from './create-character.input';

@InputType()
export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {
  @Field(() => Int)
  id: number;
}
