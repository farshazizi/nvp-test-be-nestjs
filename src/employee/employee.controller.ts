import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const { data, total } = await this.employeeService.findAll(page, limit);

    return {
      code: 'GET-EMPLOYEES-SUCCESS',
      message: 'Get Employees Successfully',
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.employeeService.findOne(id);

    return {
      code: 'GET-EMPLOYEE-SUCCESS',
      message: 'Get Employee Successfully',
      data,
    };
  }

  @Post()
  async create(@Body() body: Employee) {
    const data = await this.employeeService.create(body);

    return {
      code: 'GET-EMPLOYEE-SUCCESS',
      message: 'Update Employee Successfully',
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: Employee) {
    await this.employeeService.update(id, body);

    const data = await this.employeeService.findOne(id);

    return {
      code: 'GET-EMPLOYEE-SUCCESS',
      message: 'Update Employee Successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.employeeService.remove(id);

    return {
      code: 'GET-EMPLOYEE-SUCCESS',
      message: 'Update Employee Successfully',
      data: null,
    };
  }
}
