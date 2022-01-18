import { getConnection } from 'typeorm';

export const clearDb = async () => {
  const connection = getConnection();
  const entities = connection.entityMetadatas;

  await Promise.all(
    entities.map((entity) => {
      const repository = connection.getRepository(entity.name);
      return repository.query(`DELETE FROM ${entity.tableName}`);
    }),
  );
};

export const closeDb = () => {
  return getConnection().close();
};
