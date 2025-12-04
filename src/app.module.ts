import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nvp_test',
      autoLoadEntities: true,
      synchronize: true, // DEV only
    }),
    EmployeeModule,
  ],
})
export class AppModule {}
