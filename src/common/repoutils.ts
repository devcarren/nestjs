import { DeepPartial, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class RepoUtils {
  static async paginate<Entity>(
    repository: Repository<Entity>,
    where: FindOptionsWhere<Entity>, // Change the type to FindConditions<Entity>
    pageNumber: number,
    pageSize: number,
  ) {
    const offset = (pageNumber - 1) * pageSize;

    const [data, totalCount] = await repository.findAndCount({
      where,
      skip: offset,
      take: pageSize,
    });

    return { data, totalCount };
  }

  static async find<Entity, WhereClause>(repository: Repository<Entity>, where: FindOptionsWhere<Entity>) {
    return await repository.find({ where });
  }

  static async findWithSelect<Entity, WhereClause>(
    repository: Repository<Entity>,
    where: FindOptionsWhere<Entity>,
    select?: (keyof Entity)[],
  ) {
    return await repository.find({ where, select });
  }

  static async insertEntity<T>(repository: Repository<T>, entity: QueryDeepPartialEntity<T>): Promise<T> {
    try {
      const result = await repository.insert(entity);
      return result.raw; // returns the inserted entity
    } catch (error) {
      // Handle the error here, e.g. throw a custom error
      throw new Error('Error inserting new entity');
    }
  }

  static async upsertEntity<T>(repository: Repository<T>, entity: DeepPartial<T>): Promise<T> {
    try {
      const result = await repository.save(entity);
      return result;
    } catch (error) {
      // Handle the error here, e.g. throw a custom error
      throw new Error('Error inserting new entity');
    }
  }

  static async update<T>(repository: Repository<T>, entity: DeepPartial<T>): Promise<T> {
    try {
      const result = await repository.save(entity);
      return result;
    } catch (error) {
      // Handle the error here, e.g. throw a custom error
      throw new Error('Error inserting new entity');
    }
  }

  // static async update<T>(id: any, repository: Repository<T>, entity: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
  //   try {
  //     const result = await repository.update(id, entity);
  //     return result;
  //   } catch (error) {
  //     // Handle the error here, e.g. throw a custom error
  //     throw new Error('Error inserting new entity');
  //   }
  // }

  static async mergeEntityData<T>(entity: T, data: Partial<T>): Promise<T> {
    // Iterate over all keys in the data object
    Object.keys(data).forEach((key) => {
      // If the entity has the key, assign the value from data
      if (entity.hasOwnProperty(key)) {
        entity[key] = data[key];
      }
    });
    return entity;
  }
}
