import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Module({
  providers: [NotificationGateway],
  exports: [NotificationGateway], // supaya bisa diinject di module lain
})
export class NotificationModule {}
