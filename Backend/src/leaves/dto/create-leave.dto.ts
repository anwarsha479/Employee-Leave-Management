import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateLeaveDto {
  @ApiProperty({
    example: '7dfdb97d-2f17-4272-bf47-ae469171b58f',
    description: 'Employee ID',
  })
  @IsUUID()
  employeeId!: string;

  @ApiProperty({
    example: '2026-06-15',
    description: 'Leave start date',
  })
  @IsDateString()
  startDate!: Date;

  @ApiProperty({
    example: '2026-06-17',
    description: 'Leave end date',
  })
  @IsDateString()
  endDate!: Date;

  @ApiProperty({
    example: 'Personal work',
    description: 'Reason for leave request',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  reason!: string;
}