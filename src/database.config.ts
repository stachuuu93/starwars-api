import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const database: Record<string, TypeOrmModuleOptions> = {
  development: {
    type: 'sqlite',
    database: 'starwars.db',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
  },
  test: {
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    synchronize: true,
    dropSchema: true,
    keepConnectionAlive: true,
  },
};

const DatabaseConfig = () => ({
  ...database[process.env.NODE_ENV],
});
export default DatabaseConfig;
