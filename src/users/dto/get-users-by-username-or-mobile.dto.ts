import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Metadata } from '../../utils/interfaces';

export class GetUsersByUsernameOrMobileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    nullable: false,
    example: '09125886302',
  })
  usernameOrMobile: string;

  @IsOptional()
  @ApiProperty()
  __meta?: Metadata;
}
