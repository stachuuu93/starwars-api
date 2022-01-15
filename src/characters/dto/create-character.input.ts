import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCharacterInput {
  @Field()
  name: string;

  @Field((type) => Int)
  height: number;

  @Field((type) => Int)
  mass: number;

  @Field()
  gender: 'male' | 'female';
}
