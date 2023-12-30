import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto{
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
  password?: string;
}
