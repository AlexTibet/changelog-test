import { Request } from 'express';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { UserType } from '../../auth/strategies/jwt.constants';

export interface RequestAuth extends Request {
  user: {
    address: string;
    type: UserType;
  };
}

export class PaginationDto {
  @ApiPropertyOptional({
    minimum: 0,
    default: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  skip?: number = 0;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take?: number = 10;
}
