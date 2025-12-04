import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { AuthModule } from '../auth/auth.module';
import { EmployeeProcessor } from './employee.processor';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    NotificationModule,
    TypeOrmModule.forFeature([Employee]),
    AuthModule,
    BullModule.registerQueue({
      name: 'employee-queue',
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
  ],
  providers: [EmployeeService, EmployeeProcessor],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
