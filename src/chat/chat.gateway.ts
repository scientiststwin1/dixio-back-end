import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(8000, { namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection{

  constructor(private chatService: ChatService) {}

  @WebSocketServer() wss: Server;

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id);
  }

  @SubscribeMessage('register')
  async registerUser(client: Socket, payload: any): Promise<void> {
    const { name } = payload;

    const result = await this.chatService.registerUser(name);

    if (result.success) client['user'] = result.data.user;

    client.emit('register', result);
  }

  @SubscribeMessage('send-message')
  sendMessage(client: Socket, payload: any): void {}
}
