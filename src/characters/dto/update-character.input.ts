import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsIn, IsOptional, IsPositive } from 'class-validator';
import { CreateCharacterInput } from './create-character.input';

@InputType()
export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {
  @Field(() => Int)
  id: number;
}
