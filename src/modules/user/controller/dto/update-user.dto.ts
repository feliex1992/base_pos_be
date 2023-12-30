import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateIf, ValidateNested } from 'class-validator';
import { UserCategoryRelationDto } from 'src/modules/user-category/controller/dto/user-category-relation.dto';
import { IUserCategory } from 'src/modules/user-category/domain/interface/user-category.interface';
import { IUser } from '../../domain/interface/user.interface';

export class UpdateUserDto implements IUser {
  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin',
  })
  @IsString()
  user_name: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @ValidateIf((body) => body.avatar)
  @IsString()
  avatar?: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @ValidateIf((body) => body.email)
  @IsString()
  email?: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @ValidateIf((body) => body.address)
  @IsString()
  address?: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @ValidateIf((body) => body.contact)
  @IsString()
  contact?: string;

  @ApiProperty({
    type: UserCategoryRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.user_category)
  @ValidateNested({ each: true })
  @Type(() => UserCategoryRelationDto)
  user_category: IUserCategory;
}
