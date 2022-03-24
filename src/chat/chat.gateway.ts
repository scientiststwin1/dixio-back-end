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
    client.emit('connect');
  }

  @SubscribeMessage('register')
  async registerUser(client: Socket, payload: any): Promise<void> {
    const { name } = payload;

    const result = await this.chatService.registerUser(name);

    if (result.success) client['user'] = result.data.user;

    client.emit('register', result);
  }

  @SubscribeMessage('send-message')
  async sendMessage(client: Socket, payload: any): Promise<void> {

    const user = client['user'];
    const { message } = payload;

    const result = await this.chatService.saveMessage(user, message);

    client.emit('send-message', result);
  }
}
