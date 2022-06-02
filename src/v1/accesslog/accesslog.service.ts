import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessLog } from 'src/entity/accesss.log.entity';
import { Repository } from 'typeorm';
import { CreateAccesslogDto } from './dto/create-accesslog.dto';
import { UpdateAccesslogDto } from './dto/update-accesslog.dto';

@Injectable()
export class AccesslogService {
  constructor(
    @InjectRepository(AccessLog, 'secondaryDB')
    private accessLogRepository: Repository<AccessLog>,
  ) {}
  async create(createAccesslogDto: CreateAccesslogDto) {
    try {
      // const result: any = await this.accessLogRepository
      //   .createQueryBuilder()
      //   .insert()
      //   .into(AccessLog)
      //   .values([createAccesslogDto])
      //   .execute();
      // return result;
      return await this.accessLogRepository.save(createAccesslogDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    return await this.accessLogRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} accesslog`;
  }

  update(id: number, updateAccesslogDto: UpdateAccesslogDto) {
    console.log({ id, updateAccesslogDto });
    return `This action updates a #${id} accesslog`;
  }

  remove(id: number) {
    return `This action removes a #${id} accesslog`;
  }
}
