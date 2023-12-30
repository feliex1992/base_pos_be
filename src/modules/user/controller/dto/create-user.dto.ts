import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateIf, ValidateNested } from "class-validator";
import { UserCategoryRelationDto } from "src/modules/user-category/controller/dto/user-category-relation.dto";
import { IUserCategory } from "src/modules/user-category/domain/interface/user-category.interface";
import { IUser } from "../../domain/interface/user.interface";
import { UpdateUserDto } from "./update-user.dto";

export class CreateUserDto extends UpdateUserDto implements IUser{
  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin',
  })
  @IsString()
  password?: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin',
  })
  @IsString()
  retype_password?: string;
}
