import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsUrl } from 'class-validator';

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

  @IsPositive()
  @Field(() => Int)
  iq: number;

  @IsUrl()
  @Field()
  imageUrl: string;
}
