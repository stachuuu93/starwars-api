import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Character {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field((type) => Int)
  height: number;

  @Column()
  @Field((type) => Int)
  mass: number;

  @Column()
  @Field()
  gender: 'male' | 'female';
}
