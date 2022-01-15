import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field((type) => Int)
  height: number;

  @Field((type) => Int)
  mass: number;

  @Field()
  gender: 'male' | 'female';
}
