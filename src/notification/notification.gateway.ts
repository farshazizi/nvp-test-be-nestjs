import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log(
      'NotificationGateway server ready',
      this.server?.engine?.clientsCount,
    );
  }

  sendNotification(data: { message: string; type: string }) {
    if (!this.server) {
      console.error('Server not ready yet');
      return;
    }
    this.server.emit('notification', data);
  }
}
