import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @ApiHideProperty()
  __meta?: object;
}
