import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class CreateStarshipInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsPositive()
  @Field(() => Int)
  length: number;

  @IsPositive()
  @Field(() => Int)
  cargoCapacity: number;

  @IsPositive()
  @Field(() => Int)
  crew: number;
}
