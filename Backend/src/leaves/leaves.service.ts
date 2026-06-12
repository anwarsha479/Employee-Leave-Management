import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Leave } from './entities/leave.entity';
import { Employee } from '../employees/entities/employee.entity';

import { CreateLeaveDto } from './dto/create-leave.dto';
import { LeaveStatus } from './enums/leave-status.enum';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(
    createLeaveDto: CreateLeaveDto,
  ): Promise<Leave> {
    const employee =
      await this.employeeRepository.findOne({
        where: {
          id: createLeaveDto.employeeId,
        },
      });

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    const leave =
      this.leaveRepository.create({
        startDate:
          createLeaveDto.startDate,

        endDate:
          createLeaveDto.endDate,

        reason:
          createLeaveDto.reason,

        employee,
      });

    return this.leaveRepository.save(
      leave,
    );
  }

  async findAll(
  page = 1,
  limit = 10,
  search?: string,
  status?: string,
  employeeId?: string,
) {
  const skip = (page - 1) * limit;

  const query =
    this.leaveRepository.createQueryBuilder(
      'leave',
    );

  query.leftJoinAndSelect(
    'leave.employee',
    'employee',
  );

  if (search) {
    query.andWhere(
      'LOWER(employee.name) LIKE LOWER(:search)',
      {
        search: `%${search}%`,
      },
    );
  }

  if (status) {
    query.andWhere(
      'leave.status = :status',
      {
        status,
      },
    );
  }

  if (employeeId) {
    query.andWhere(
      'employee.id = :employeeId',
      {
        employeeId,
      },
    );
  }

  query
    .orderBy(
      'leave.createdAt',
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

async findOne(id: string): Promise<Leave> {
  const leave =
    await this.leaveRepository.findOne({
      where: { id },
      relations: {
        employee: true,
      },
    });

  if (!leave) {
    throw new NotFoundException(
      'Leave not found',
    );
  }

  return leave;
}

async updateStatus(
  id: string,
  status: LeaveStatus,
): Promise<Leave> {
  const leave =
    await this.findOne(id);

  leave.status = status;

  return this.leaveRepository.save(
    leave,
  );
}
}