import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Starship {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  length: number;

  @Column()
  @Field(() => Int)
  cargoCapacity: number;

  @Column()
  @Field(() => Int)
  crew: number;

  @Column()
  @Field()
  imageUrl: string;
}
