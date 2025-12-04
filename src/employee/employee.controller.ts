import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { NotificationGateway } from 'src/notification/notification.gateway';
// import { PermissionGuard } from '../auth/permission/permission.guard';
// import { Permissions } from '../auth/permission/permission.decorator';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private readonly notificationGateway: NotificationGateway,
    @InjectQueue('employee-queue') private readonly employeeQueue: Queue,
  ) {}

  @Get()
  // @Permissions('employee.read')
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
  // @Permissions('employee.create')
  async create(@Body() body: Employee) {
    // Simpan employee di database
    const data = await this.employeeService.create(body);

    // Tambahkan job ke Redis queue untuk notifikasi
    // await this.employeeQueue.add('create-employee', { employee: data });

    this.notificationGateway.sendNotification({
      message: `Employee ${data.name} created successfully!`,
      type: 'success',
    });

    return {
      code: 'CREATE-EMPLOYEE-SUCCESS',
      message: 'Employee creation in progress',
      data,
    };
  }

  @Patch(':id')
  // @Permissions('employee.update')
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
  // @Permissions('employee.delete')
  async remove(@Param('id') id: string) {
    await this.employeeService.remove(id);

    return {
      code: 'GET-EMPLOYEE-SUCCESS',
      message: 'Update Employee Successfully',
      data: null,
    };
  }
}
