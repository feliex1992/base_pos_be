import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsString, ValidateIf } from "class-validator";
import { IUserCategory } from "../../domain/interface/user-category.interface";

export class CreateUserCategoryDto implements IUserCategory {
  @ApiProperty({
    type: 'string',
    required: true,
    default: 'ADM',
  })
  @IsString()
  code: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'Administrator',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: 'boolean',
    required: false,
    default: false,
  })
  @ValidateIf((body) => body.privilege)
  @IsBoolean()
  privilege?: boolean = false;

  @ApiProperty({
    type: [String],
    required: false,
  })
  @ValidateIf((body) => body.list_menu)
  @IsArray()
  @IsString({ each: true })
  list_menu?: string[] = [];
}
