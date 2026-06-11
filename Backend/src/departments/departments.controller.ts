import {
  Body,
  Controller,
  Post,
  Get, 
  Put,
  Delete,
  Query
} from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Param } from '@nestjs/common';

@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
  ) {}

  @Post()
  create(
    @Body()
    createDepartmentDto: CreateDepartmentDto,
  ) {
    return this.departmentsService.create(
      createDepartmentDto,
    );
  }

  @Get()
findAll(
  @Query('page') page?: number,
  @Query('limit') limit?: number,
  @Query('search') search?: string,
) {
  return this.departmentsService.findAll(
    page,
    limit,
    search,
  );
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.departmentsService.findOne(id);
}

@Put(':id')
update(
  @Param('id') id: string,
  @Body()
  updateDepartmentDto: UpdateDepartmentDto,
) {
  return this.departmentsService.update(
    id,
    updateDepartmentDto,
  );
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.departmentsService.remove(id);
}
}