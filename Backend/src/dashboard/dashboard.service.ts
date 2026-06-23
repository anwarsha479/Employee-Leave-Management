import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Employee } from '../employees/entities/employee.entity';
import { Department } from '../departments/entities/department.entity';
import { Leave } from '../leaves/entities/leave.entity';
import { LeaveStatus } from '../leaves/enums/leave-status.enum';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,

    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
  ) {}

  async getStats() {
    const totalEmployees = await this.employeeRepository.count();

    const totalDepartments = await this.departmentRepository.count();

    const totalLeaves = await this.leaveRepository.count();

    const pendingLeaves = await this.leaveRepository.count({
      where: {
        status: LeaveStatus.PENDING,
      },
    });

    const approvedLeaves = await this.leaveRepository.count({
      where: {
        status: LeaveStatus.APPROVED,
      },
    });

    const rejectedLeaves = await this.leaveRepository.count({
      where: {
        status: LeaveStatus.REJECTED,
      },
    });

    return {
      totalEmployees,
      totalDepartments,
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
    };
  }
}
