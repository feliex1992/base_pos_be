import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  ValidateIf,
} from 'class-validator';

export class BaseFilterDto {
  @ApiProperty({ type: Number, required: false })
  @Transform((body) => Number(body.value))
  @ValidateIf((body) => body.page)
  @IsNumber()
  page = 1;

  @ApiProperty({ type: Number, required: false })
  @Transform((body) => Number(body.value))
  @ValidateIf((body) => body.limit)
  @IsNumber()
  limit = 10;

  @ApiProperty({ type: String, required: false })
  search_by: string;

  @ApiProperty({ type: String, required: false, example: `{"code": "ASC", "description": "DESC"}`})
  order_by: string;

  @ApiProperty({ type: Number, required: false })
  @Transform((body) => Number(body.value))
  @ValidateIf((body) => body.page)
  @IsNumber()
  minimal_query = 0;
}
