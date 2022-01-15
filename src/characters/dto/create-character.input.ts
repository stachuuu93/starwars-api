import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlphanumeric, IsIn, IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class CreateCharacterInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsPositive()
  @Field(() => Int)
  height: number;

  @IsPositive()
  @Field(() => Int)
  mass: number;

  @IsIn(['male', 'female'])
  @Field()
  gender: 'male' | 'female';
}
