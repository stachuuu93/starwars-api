import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getConnection, Repository } from 'typeorm';

import { AppModule } from './../src/app.module';
import { Starship } from '../src/starships/entities/starship.entity';
import { clearDb, closeDb } from './database';

describe('Starship (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Starship>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = getConnection().getRepository(Starship);
  });

  afterEach(async () => {
    await clearDb();
  });

  afterAll(async () => {
    await closeDb();
  });

  const gql = '/graphql';

  it('should create starship', () => {
    const query = `
      mutation {
        createStarship(createStarshipInput: {
          name: "Millennium Falcon",
          length: 20,
          cargoCapacity: 1700,
          crew: 13,
          imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg"
        }) {
          id,
          name,
          length,
          cargoCapacity,
          crew,
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
        expect(res.body.data.createStarship).toEqual({
          id: 1,
          name: 'Millennium Falcon',
          length: 20,
          cargoCapacity: 1700,
          crew: 13,
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg',
        });
      });
  });

  it('should fetch one starship', async () => {
    const starship = {
      name: 'Millennium Falcon',
      length: 20,
      cargoCapacity: 1700,
      crew: 13,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg',
    };

    const newStarship = repository.create(starship);
    const createResult = await repository.save(newStarship);

    const query = `
    query {
      starship(id: ${createResult.id}) {
        id,
        name,
        length,
        cargoCapacity,
        crew,
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
        expect(res.body.data.starship).toEqual(createResult);
      });
  });

  it('should fetch many starships', async () => {
    const starships = [
      {
        name: 'Millennium Falcon',
        length: 20,
        cargoCapacity: 1700,
        crew: 13,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg',
      },
      {
        name: 'Millennium Falcon 2',
        length: 21,
        cargoCapacity: 1701,
        crew: 13,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg',
      },
    ];

    for (const starship of starships) {
      const newStarship = repository.create(starship);
      await repository.save(newStarship);
    }

    const query = `
    query {
      starships {
        name,
        length,
        cargoCapacity,
        crew,
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
        expect(res.body.data.starships).toEqual(starships);
      });
  });

  it('should update starship', async () => {
    const starship = {
      name: 'Millennium Falcon',
      length: 20,
      cargoCapacity: 1700,
      crew: 13,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg',
    };

    const newStarship = repository.create(starship);
    const createResult = await repository.save(newStarship);

    const query = `
      mutation {
        updateStarship(updateStarshipInput: {
          id: ${createResult.id}
          name: "Daeth star",
        }) {
          name,
          length,
          cargoCapacity,
          crew,
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
        expect(res.body.data.updateStarship).toEqual({
          ...starship,
          name: 'Daeth star',
        });
      });
  });

  it('should remove starship', async () => {
    const starship = {
      name: 'Millennium Falcon',
      length: 20,
      cargoCapacity: 1700,
      crew: 13,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg',
    };

    const newStarship = repository.create(starship);
    const createResult = await repository.save(newStarship);

    const query = `
      mutation {
        removeStarship(id: ${createResult.id}) {
          name,
          length,
          cargoCapacity,
          crew,
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
        expect(res.body.data.removeStarship).toEqual(starship);
      });
  });
});
