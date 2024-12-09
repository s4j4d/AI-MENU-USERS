import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Metadata } from '../../utils/interfaces';

export class GetUserProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    nullable: false,
    example: '5ff76299-e94d-4c04-9a85-1d1f3fca2b90',
  })
  id: string;

  @IsOptional()
  @ApiProperty()
  __meta?: Metadata;
}
