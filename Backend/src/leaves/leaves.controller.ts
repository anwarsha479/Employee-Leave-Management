import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { LeavesService } from './leaves.service';

import { CreateLeaveDto } from './dto/create-leave.dto';
import { LeaveStatus } from './enums/leave-status.enum';

@Controller('leaves')
export class LeavesController {
  constructor(
    private readonly leavesService: LeavesService,
  ) {}

  @Post()
  create(
    @Body()
    createLeaveDto: CreateLeaveDto,
  ) {
    return this.leavesService.create(
      createLeaveDto,
    );
  }

 @Get()
findAll(
  @Query('page') page?: number,
  @Query('limit') limit?: number,
  @Query('search') search?: string,
  @Query('status') status?: string,
  @Query('employeeId') employeeId?: string,
) {
  return this.leavesService.findAll(
    page,
    limit,
    search,
    status,
    employeeId,
  );
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.leavesService.findOne(id);
}

@Post(':id/approve')
approve(
  @Param('id') id: string,
) {
  return this.leavesService.updateStatus(
    id,
    LeaveStatus.APPROVED,
  );
}

@Post(':id/reject')
reject(
  @Param('id') id: string,
) {
  return this.leavesService.updateStatus(
    id,
    LeaveStatus.REJECTED,
  );
}
}