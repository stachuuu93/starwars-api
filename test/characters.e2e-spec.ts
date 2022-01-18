import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getConnection, Repository } from 'typeorm';

import { AppModule } from './../src/app.module';
import { Character } from '../src/characters/entities/characters.entity';
import { clearDb, closeDb } from './database';

describe('Characters (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Character>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = getConnection().getRepository(Character);
  });

  afterEach(async () => {
    await clearDb();
  });

  afterAll(async () => {
    await closeDb();
  });

  const gql = '/graphql';

  it('should create character', () => {
    const query = `
      mutation {
        createCharacter(createCharacterInput: {
          name: "Luke 2",
          mass: 67,
          height: 190,
          iq: 200,
          imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png"
        }) {
          id,
          name,
          mass,
          height,
          iq,
          imageUrl
        }
      }
    `;
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createCharacter).toEqual({
          id: 1,
          name: 'Luke 2',
          mass: 67,
          height: 190,
          iq: 200,
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
        });
      });
  });

  it('should fetch one character', async () => {
    const character = {
      name: 'Luke 2',
      mass: 67,
      height: 190,
      iq: 200,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
    };

    const newCharacter = repository.create(character);
    const createResult = await repository.save(newCharacter);

    const query = `
    query {
      character(id: ${createResult.id}) {
        id
        name,
        mass,
        height,
        iq,
        imageUrl
      }
    }
  `;

    return request(app.getHttpServer())
      .post(gql)
      .send({
        query,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.character).toEqual(createResult);
      });
  });

  it('should fetch many characters', async () => {
    const characters = [
      {
        name: 'Luke',
        mass: 67,
        height: 190,
        iq: 200,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        name: 'Luke 2',
        mass: 67,
        height: 190,
        iq: 200,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
    ];

    for (const character of characters) {
      const newCharacter = repository.create(character);
      await repository.save(newCharacter);
    }

    const query = `
    query {
      characters {
        name,
        mass,
        height,
        iq,
        imageUrl
      }
    }
  `;

    return request(app.getHttpServer())
      .post(gql)
      .send({
        query,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.characters).toEqual(characters);
      });
  });

  it('should update character', async () => {
    const character = {
      name: 'Luke 2',
      mass: 67,
      height: 190,
      iq: 200,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
    };

    const newCharacter = repository.create(character);
    const createResult = await repository.save(newCharacter);

    const query = `
      mutation {
        updateCharacter(updateCharacterInput: {
          id: ${createResult.id}
          name: "Luke Skywalker",
        }) {
          name,
          mass,
          height,
          iq,
          imageUrl
        }
      }
    `;

    return request(app.getHttpServer())
      .post(gql)
      .send({
        query,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateCharacter).toEqual({
          ...character,
          name: 'Luke Skywalker',
        });
      });
  });

  it('should remove character', async () => {
    const character = {
      name: 'Luke 2',
      mass: 67,
      height: 190,
      iq: 200,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
    };

    const newCharacter = repository.create(character);
    const createResult = await repository.save(newCharacter);

    const query = `
      mutation {
        removeCharacter(id: ${createResult.id}) {
          name,
          mass,
          height,
          iq,
          imageUrl
        }
      }
    `;

    return request(app.getHttpServer())
      .post(gql)
      .send({
        query,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.removeCharacter).toEqual(character);
      });
  });
});
