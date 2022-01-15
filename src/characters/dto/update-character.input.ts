import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCharacterInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  height?: number;

  @Field(() => Int, { nullable: true })
  mass?: number;

  @Field({ nullable: true })
  gender?: 'male' | 'female';
}
