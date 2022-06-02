import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccesslogService } from './accesslog.service';
import { CreateAccesslogDto } from './dto/create-accesslog.dto';
import { UpdateAccesslogDto } from './dto/update-accesslog.dto';

@Controller('accesslog')
export class AccesslogController {
  constructor(private readonly accesslogService: AccesslogService) {}

  @Post()
  create(@Body() createAccesslogDto: CreateAccesslogDto) {
    return this.accesslogService.create(createAccesslogDto);
  }

  @Get()
  findAll() {
    return this.accesslogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accesslogService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccesslogDto: UpdateAccesslogDto,
  ) {
    return this.accesslogService.update(+id, updateAccesslogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accesslogService.remove(+id);
  }
}
