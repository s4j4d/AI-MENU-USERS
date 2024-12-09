import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Metadata } from '../../utils/interfaces';

export class GetUserByMobileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;

  @IsOptional()
  @ApiProperty()
  __meta?: Metadata;
}
