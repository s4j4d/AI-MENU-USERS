import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Metadata } from '../../utils/interfaces';

export class CreateUserDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    nullable: false,
    example: '5ff76299-e94d-4c04-9a85-1d1f3fca2b90',
  })
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'iman',
  })
  username?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    nullable: false,
    example: '09373151433',
  })
  mobile: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: false,
    example: 'Qwer@1234',
  })
  password?: string;

  @IsNotEmpty()
  @ApiHideProperty()
  __meta: Metadata;
}
