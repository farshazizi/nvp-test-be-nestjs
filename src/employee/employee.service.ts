import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employee: Repository<Employee>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [data, total] = await this.employee.findAndCount({
        skip,
        take: limit,
        order: { created_at: 'ASC' },
      });

      return { data, total };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Unknown error occurred in findAll()');
    }
  }

  async findOne(id: string) {
    return await this.employee.findOne({ where: { id } });
  }

  async create(data: Partial<Employee>) {
    const employee = this.employee.create(data);
    return await this.employee.save(employee);
  }

  async update(id: string, data: Partial<Employee>) {
    return await this.employee.update(id, data);
  }

  async remove(id: string) {
    return await this.employee.delete(id);
  }
}
