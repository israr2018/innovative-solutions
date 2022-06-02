
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import {Owner, OwnerDocument} from './schemas/owner.schema'
import { throwIfEmpty } from 'rxjs';

@Injectable()
export class OwnerService {
 
  constructor(
    // @InjectModel('Owner') private readonly ownerModel:Model<OwnerDocument>
    @Inject('OWNERS_MODEL') private readonly ownerModel:Model<OwnerDocument>
  ) {
    
  }
  async create(createOwnerDto: CreateOwnerDto):Promise<Owner> {
    const newOwner= new this.ownerModel(createOwnerDto);
    return  newOwner.save();
  }

  async findAll():Promise<Owner[]> {
    return this.ownerModel.find().exec()
  }

  async findOne(id: number):Promise<Owner> {
    return this.ownerModel.findById(id);
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
   return this.ownerModel.findOneAndUpdate({_id:id},updateOwnerDto);
  }

  async remove(id: number) {
    return this.ownerModel.findByIdAndRemove(id);
  }
}
