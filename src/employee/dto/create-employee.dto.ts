import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(18)
  age: number;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsInt()
  @Min(0)
  salary: number;
}
