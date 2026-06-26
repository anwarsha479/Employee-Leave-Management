import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Query,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('employees')
@ApiBearerAuth()
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(
    @Body()
    createEmployeeDto: CreateEmployeeDto,
  ) {
    return this.employeesService.create(
      createEmployeeDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyProfile(
    @Req()
    req: Request & {
      user: {
        userId: string;
      };
    },
  ) {
    return this.employeesService.getMyProfile(
      req.user.userId,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.employeesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id')
    id: string,
    @Body()
    updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(
      id,
      updateEmployeeDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(
    @Param('id')
    id: string,
  ) {
    return this.employeesService.remove(id);
  }
}