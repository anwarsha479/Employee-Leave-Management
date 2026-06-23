import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateLeaveDto {
  @IsOptional()
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
