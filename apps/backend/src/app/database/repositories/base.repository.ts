import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  ObjectID,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from 'typeorm';

import {
  FindManyOptions as TypeOrmFindManyOptions,
  SaveOptions as TypeOrmSaveOptions,
  RemoveOptions as TypeOrmRemoveOptions,
} from 'typeorm';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

export interface FindManyOptions<Entity>
  extends TypeOrmFindManyOptions<Entity> {
  queryRunner?: QueryRunner;
}

export interface SaveOptions extends TypeOrmSaveOptions {
  queryRunner?: QueryRunner;
}

export interface UpdateOptions {
  queryRunner?: QueryRunner;
}

export interface RemoveOptions extends TypeOrmRemoveOptions {
  queryRunner?: QueryRunner;
}

export interface DeleteOptions {
  queryRunner?: QueryRunner;
}

export interface IPagination {
  take?: number;
  skip?: number;
}

type conditions<Entity> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectID
  | ObjectID[]
  | FindConditions<Entity>;

export default class BaseRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  override async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.find(
        this.metadata.target,
        options,
      );
      return data;
    }

    const data = await super.find(options);
    return data;
  }

  override async save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T> {
    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.save(entity, options);
      return data;
    }

    const data = await super.save(entity, options);
    return data;
  }

  override async update(
    criteria: FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
    options?: UpdateOptions,
  ): Promise<UpdateResult> {
    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.update(
        this.metadata.target,
        criteria,
        partialEntity,
      );

      return data;
    }

    const data = await super.update(criteria, partialEntity);
    return data;
  }

  override remove(
    entities: Entity[],
    options?: RemoveOptions,
  ): Promise<Entity[]>;
  override remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;

  override async remove(
    entity: Entity | Entity[],
    options?: RemoveOptions,
  ): Promise<Entity | Entity[]> {
    if (!Array.isArray(entity)) {
      entity = [entity];
    }

    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.remove(
        this.metadata.target,
        entity,
        options,
      );

      return data;
    }

    const data = await super.remove(entity, options);
    return data;
  }

  override async delete(
    criteria: conditions<Entity>,
    options?: DeleteOptions,
  ): Promise<DeleteResult> {
    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.delete(
        this.metadata.target,
        criteria,
      );

      return data;
    }

    const data = await super.delete(criteria);
    return data;
  }
}
