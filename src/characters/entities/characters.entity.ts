import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Character {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  height: number;

  @Column()
  @Field(() => Int)
  mass: number;

  @Column()
  @Field(() => Int)
  iq: number;

  @Column()
  @Field()
  imageUrl: string;
}
