import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @ApiHideProperty()
  __meta?: object;
}
