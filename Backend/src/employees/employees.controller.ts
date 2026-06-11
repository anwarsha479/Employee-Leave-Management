import {
  Body,
  Controller,
  Post,
  Get,
  Put, Delete, Query, Param,
} from '@nestjs/common';

import { EmployeesService } from './employees.service';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
  ) {}

  @Post()
  create(
    @Body()
    createEmployeeDto: CreateEmployeeDto,
  ) {
    return this.employeesService.create(
      createEmployeeDto,
    );
  }

  @Get()
findAll(
  @Query('page') page?: number,
  @Query('limit') limit?: number,
  @Query('search') search?: string,
  @Query('departmentId') departmentId?: string,
) {
  return this.employeesService.findAll(
    page,
    limit,
    search,
    departmentId,
  );
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.employeesService.findOne(id);
}

@Put(':id')
update(
  @Param('id') id: string,
  @Body()
  updateEmployeeDto: UpdateEmployeeDto,
) {
  return this.employeesService.update(
    id,
    updateEmployeeDto,
  );
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.employeesService.remove(id);
}
}