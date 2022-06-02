import mongoose from 'mongoose';
import { IRepository } from './IRepository';
import { LoggerHelper } from '../helpers/LoggerHelper';
import { Types } from 'mongoose';
const FILE_NAME = 'baseRepository.ts';

export class BaseRepository<T> implements IRepository<T> {
  private readonly _model: mongoose.Model<mongoose.Document>;
  logger: LoggerHelper;

  constructor(
    schemaModel: mongoose.Model<mongoose.Document>,
    logger: LoggerHelper,
  ) {
    this._model = schemaModel;
    this.logger = logger;
  }

  async create(item: T): Promise<any> {
    this.logger.info({
      app_message: 'CREATE_START',
      log_info: {
        fileName: FILE_NAME,
      },
    });

    try {
      return await this._model.create(item);
    } catch (err) {
      this.logger.error({
        app_message: 'CREATE_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
        },
        metadata: { errorMessage: err.message },
      });
      throw err;
    }
  }

  async InsertMany(items: T[]): Promise<any> {
    this.logger.info({
      app_message: 'INSERT_MANY_START',
      log_info: {
        fileName: FILE_NAME,
      },
      metadata: {},
    });

    try {
      return await this._model.insertMany(items);
    } catch (err) {
      this.logger.error({
        app_message: 'INSERT_MANY_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
        },
        metadata: { errorMessage: err.message },
      });
      throw err;
    }
  }
  async createPartial(item: Partial<T>): Promise<any> {
    this.logger.info({
      app_message: 'CREATE_PARTIAL_START',
      log_info: {
        fileName: FILE_NAME,
        item,
      },
      metadata: {},
    });
    try {
      const objectToSave = new this._model(item);
      return await objectToSave.save();
    } catch (err) {
      this.logger.error({
        app_message: 'CREATE_PARTIAL_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          item,
        },
        metadata: { errorMessage: err.message },
      });
      throw err;
    }
  }

  async update(id: string, item: Partial<T>): Promise<any> {
    this.logger.info({
      app_message: 'UPDATE_START',
      log_info: {
        fileName: FILE_NAME,
        id: id,
        item: item,
      },
    });

    try {
      return await this._model
        .findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: item,
          },
          {
            new: true,
          },
        )
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'UPDATE_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
        },
        metadata: { errorMessage: err.message, id: id },
      });

      throw err;
    }
  }

  async updateByQuery(
    condition: Record<string, any>,
    item: Record<string, any>,
    options = { new: true },
  ): Promise<any> {
    this.logger.debug({
      app_message: 'UPDATE_BY_QUERY_START',
      log_info: {
        fileName: FILE_NAME,
        condition: condition,
      },
    });
    try {
      return await this._model
        .findOneAndUpdate(
          condition,
          {
            $set: item,
          },
          options,
        )
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'UPDATE_BY_QUERY_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          condition: condition,
        },
      });
      throw err;
    }
  }

  async updateAndPushByQuery(
    condition: Record<string, any>,
    item: Record<string, any>,
    pushItem: Record<string, any>,
    options = { new: true },
  ): Promise<any> {
    this.logger.debug({
      app_message: 'UPDATE_PUSH_QUERY_START',
      log_info: {
        fileName: FILE_NAME,
        condition: condition,
      },
    });
    try {
      return await this._model
        .findOneAndUpdate(
          condition,
          {
            $set: item,
            $push: pushItem,
          },
          options,
        )
        .lean()
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'UPDATE_PUSH_QUERY_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          condition: condition,
        },
      });
      throw err;
    }
  }

  /**
   *
   * @param condition
   * @param pushItem
   * @param options
   */
  async pushByQuery(
    condition: Record<string, any>,
    pushItem: Record<string, any>,
    options = { new: true },
  ): Promise<any> {
    this.logger.debug({
      app_message: 'ONLY_PUSH_QUERY_START',
      log_info: {
        fileName: FILE_NAME,
        condition: condition,
      },
    });
    try {
      return await this._model
        .findOneAndUpdate(
          condition,
          {
            $push: pushItem,
          },
          options,
        )
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'ONLY_PUSH_QUERY_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          condition: condition,
        },
      });
      throw err;
    }
  }

  async delete(id: string): Promise<any> {
    this.logger.debug({
      app_message: 'DELETE_START',
      log_info: {
        fileName: FILE_NAME,
      },
      metadata: { id: id },
    });
    try {
      return await this._model
        .findOneAndDelete({
          _id: new Types.ObjectId(id),
        })
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'DELETE_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
        },
        metadata: { id: id },
      });
      throw err;
    }
  }

  async deleteWithQuery(query = {}): Promise<any> {
    this.logger.info({
      app_message: 'DELETE_QUERY_START',
      log_info: {
        fileName: FILE_NAME,
        query: query,
      },
    });
    try {
      return await this._model.findOneAndDelete(query).exec();
    } catch (err) {
      this.logger.error({
        app_message: 'DELETE_QUERY_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
      });
      throw err;
    }
  }

  async find(query = {}, sort = null, select = null): Promise<any> {
    this.logger.debug({
      app_message: 'FIND_START',
      log_info: {
        fileName: FILE_NAME,
        query: query,
      },
      metadata: {},
    });
    try {
      let qry = this._model.find(query, select);

      if (sort) {
        qry = qry.sort(sort);
      }

      return await qry.lean().exec();
    } catch (err) {
      this.logger.error({
        app_message: 'FIND_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
        metadata: {},
      });
      throw err;
    }
  }

  async findWIthSkipAndLimit(
    query = {},
    skip: number,
    limit: number,
    sort = null,
  ): Promise<any> {
    this.logger.debug({
      app_message: 'FIND_WITH_LIMIT_START',
      log_info: {
        fileName: FILE_NAME,
        query: query,
      },
      metadata: {},
    });
    try {
      let qry = this._model.find(query);

      if (sort) {
        qry = qry.sort(sort);
      }

      return await qry
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'FIND_WITH_LIMIT_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
        metadata: {},
      });
      throw err;
    }
  }

  async findOne(id: string): Promise<any> {
    this.logger.debug({
      app_message: 'FIND_ONE_START',
      log_info: {
        fileName: FILE_NAME,
      },
      metadata: { id: id },
    });
    try {
      return await this._model
        .findOne({ _id: id })
        .lean()
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'FIND_ONE_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
        },
        metadata: { id: id },
      });
      throw err;
    }
  }
  async findOneByQuery(
    query: Record<string, any>,
    filterFields?: Record<string, any>,
  ): Promise<any> {
    this.logger.debug({
      app_message: 'FIND_BY_QUERY_START',
      log_info: {
        fileName: FILE_NAME,
        query: query,
      },
    });
    try {
      return await this._model
        .findOne(query, filterFields)
        .lean()
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'FIND_BY_QUERY_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
      });
      throw err;
    }
  }

  async findAllByQuery(
    query: Record<string, any>,
    filterFields?: Record<string, any>,
  ): Promise<any> {
    this.logger.debug({
      app_message: 'FIND_ALL_BY_QUERY_START',
      log_info: {
        fileName: FILE_NAME,
        query: query,
      },
    });
    try {
      return await this._model
        .find(query, filterFields)
        .lean()
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'FIND_ALL_BY_QUERY_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
      });
      throw err;
    }
  }

  async countByQuery(query: Record<string, any>): Promise<any> {
    this.logger.debug({
      app_message: 'COUNT_BY_QUERY_START',
      log_info: {
        fileName: FILE_NAME,
        query: query,
      },
    });
    try {
      return await this._model.countDocuments(query).exec();
    } catch (err) {
      this.logger.error({
        app_message: 'COUNT_BY_QUERY_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
      });
      throw err;
    }
  }

  async aggregate(query: any[], offset = 0, limit = 50): Promise<any> {
    this.logger.debug({
      app_message: 'AGGREGATE_QUERY_START',
      log_info: {
        fileName: FILE_NAME,
        query: query,
      },
    });
    try {
      let qry = this._model.aggregate(query).skip(offset);

      if (limit > 0) {
        qry = qry.limit(limit);
      }

      return await qry.exec();
    } catch (err) {
      this.logger.error({
        app_message: 'AGGREGATE_QUERY_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
      });
      throw err;
    }
  }

  async pushData(query = {}, pushData = {}): Promise<any> {
    try {
      return await this._model
        .update(query, {
          $push: pushData,
        })
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'PRODUCT_PUSH_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
      });
      throw err;
    }
  }

  async pullData(query = {}, pullQuery = {}): Promise<any> {
    try {
      return await this._model
        .update(query, {
          $pull: pullQuery,
        })
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'PRODUCT_PULL_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
      });
      throw err;
    }
  }

  async findOneAndPullData(query = {}, pullQuery = {}): Promise<any> {
    try {
      return await this._model
        .findOneAndUpdate(
          query,
          {
            $pull: pullQuery,
          },
          { new: true },
        )
        .lean()
        .exec();
    } catch (err) {
      this.logger.error({
        app_message: 'FIND_ONE_AND_PULL_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
      });
      throw err;
    }
  }

  async findAndSelect(query = {}, sort = null, cols = null): Promise<any> {
    this.logger.debug({
      app_message: 'FIND_START',
      log_info: {
        fileName: FILE_NAME,
        query: query,
      },
      metadata: {},
    });
    try {
      let qry = this._model.find(query);

      if (cols) {
        qry = qry.select(cols);
      }

      if (sort) {
        qry = qry.sort(sort);
      }

      return await qry.lean().exec();
    } catch (err) {
      this.logger.error({
        app_message: 'FIND_ERROR',
        log_info: {
          fileName: FILE_NAME,
          errorMessage: err.message,
          errorStack: err.stack,
          query: query,
        },
        metadata: {},
      });
      throw err;
    }
  }
}
