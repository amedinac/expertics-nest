import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  serial: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  coverage: string;

  @IsString()
  @IsNotEmpty()
  vmi: string;

  @IsString()
  @IsNotEmpty()
  fail: string;
}
