import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Password reset token',
  })
  @IsNotEmpty()
  token!: string;

  @ApiProperty({
    example: 'NewPassword123',
    description: 'New account password',
  })
  @MinLength(6)
  password!: string;
}