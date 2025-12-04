import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { NotificationGateway } from '../notification/notification.gateway';
import { Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';

@Processor('employee-queue')
@Injectable()
export class EmployeeProcessor {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  @Process('create-employee')
  async handleCreateEmployee(job: Job<{ employee: Employee }>) {
    const { employee } = job.data;
    console.log('Processing job for employee:', employee.name);

    // Simulasi background processing (misal validasi data)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Kirim notifikasi ke frontend
    this.notificationGateway.sendNotification({
      message: `Data karyawan ${employee.name} berhasil diproses`,
      type: 'success',
    });

    return { status: 'done' };
  }
}
