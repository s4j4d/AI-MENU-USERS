import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Metadata } from '../../utils/interfaces';

export class GetUserByMobileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;

  @IsNotEmpty()
  @ApiProperty()
  __meta: Metadata;
}
