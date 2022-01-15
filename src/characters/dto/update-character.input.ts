import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class UpdateCharacterInput {
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsPositive()
  @Field(() => Int, { nullable: true })
  height?: number;

  @IsOptional()
  @IsPositive()
  @Field(() => Int, { nullable: true })
  mass?: number;

  @IsOptional()
  @IsIn(['male', 'female'])
  @Field({ nullable: true })
  gender?: 'male' | 'female';
}
