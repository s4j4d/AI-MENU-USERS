import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Metadata } from '../../utils/interfaces';

export class UpdateUserProfileDto {
  @IsOptional()
  @ApiHideProperty()
  _id?: string;

  @IsString()
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
    example: '5ff76299-e94d-4c04-9a85-1d1f3fca2b90',
  })
  imageId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'M',
  })
  gender?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'آریا',
  })
  firstName?: string;


  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'تهرانی',
  })
  lastName?: string;


  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    example: '09373151433',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    example: '02166667777',
  })
  fax?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'خراسان رضوی',
  })
  province?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'مشهد',
  })
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'میدان خیام - کوی امیرالمومنین - خیابان امیر ۲۴ - پلاک ۱۰۰',
  })
  address?: string;

  @IsOptional()
  @ApiProperty()
  __meta?: Metadata;
}
