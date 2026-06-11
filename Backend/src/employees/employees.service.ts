import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository, ILike } from 'typeorm';

import { Employee } from './entities/employee.entity';
import { Department } from '../departments/entities/department.entity';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const existingEmployee =
      await this.employeeRepository.findOne({
        where: [
          {
            email: createEmployeeDto.email,
          },
          {
            employeeCode:
              createEmployeeDto.employeeCode,
          },
        ],
      });

    if (existingEmployee) {
      throw new ConflictException(
        'Employee already exists',
      );
    }

    const department =
      await this.departmentRepository.findOne({
        where: {
          id: createEmployeeDto.departmentId,
        },
      });

    if (!department) {
      throw new NotFoundException(
        'Department not found',
      );
    }

    const employee =
      this.employeeRepository.create({
        employeeCode:
          createEmployeeDto.employeeCode,

        name: createEmployeeDto.name,

        email: createEmployeeDto.email,

        phone: createEmployeeDto.phone,

        designation:
          createEmployeeDto.designation,

        joiningDate:
          createEmployeeDto.joiningDate,

        department,
      });

    return this.employeeRepository.save(
      employee,
    );
  }

  async findAll(
  page = 1,
  limit = 10,
  search?: string,
  departmentId?: string,
) {
  const skip = (page - 1) * limit;

  const query =
    this.employeeRepository.createQueryBuilder(
      'employee',
    );

  query.leftJoinAndSelect(
    'employee.department',
    'department',
  );

  if (search) {
    query.andWhere(
      'LOWER(employee.name) LIKE LOWER(:search)',
      {
        search: `%${search}%`,
      },
    );
  }

  if (departmentId) {
    query.andWhere(
      'department.id = :departmentId',
      {
        departmentId,
      },
    );
  }

  query
    .orderBy(
      'employee.createdAt',
      'DESC',
    )
    .skip(skip)
    .take(limit);

  const [data, total] =
    await query.getManyAndCount();

  return {
    data,
    total,
    page,
    limit,
  };
}

async findOne(id: string): Promise<Employee> {
  const employee =
    await this.employeeRepository.findOne({
      where: { id },
      relations: {
        department: true,
      },
    });

  if (!employee) {
    throw new NotFoundException(
      'Employee not found',
    );
  }

  return employee;
}

async update(
  id: string,
  updateEmployeeDto: UpdateEmployeeDto,
): Promise<Employee> {
  const employee =
    await this.findOne(id);

  if (updateEmployeeDto.departmentId) {
    const department =
      await this.departmentRepository.findOne({
        where: {
          id: updateEmployeeDto.departmentId,
        },
      });

    if (!department) {
      throw new NotFoundException(
        'Department not found',
      );
    }

    employee.department = department;
  }

  Object.assign(employee, {
    employeeCode:
      updateEmployeeDto.employeeCode ??
      employee.employeeCode,

    name:
      updateEmployeeDto.name ??
      employee.name,

    email:
      updateEmployeeDto.email ??
      employee.email,

    phone:
      updateEmployeeDto.phone ??
      employee.phone,

    designation:
      updateEmployeeDto.designation ??
      employee.designation,

    joiningDate:
      updateEmployeeDto.joiningDate ??
      employee.joiningDate,
  });

  return this.employeeRepository.save(
    employee,
  );
}

async remove(id: string): Promise<void> {
  const employee =
    await this.findOne(id);

  await this.employeeRepository.remove(
    employee,
  );
}
}

