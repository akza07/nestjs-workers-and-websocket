import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  async handleConnection(client: any, ...args: any[]) {
    Logger.verbose('Client connected', 'Client');
    Logger.verbose('Client Socket ID :' + client.id, 'Client');
  }
  async handleDisconnect(client: any) {
    Logger.verbose('Client disconnected', 'Client');
    Logger.verbose('Client Socket ID :' + client.id, 'Client');
  }

  @SubscribeMessage('event.send')
  listenMessages(@MessageBody() message: string, @ConnectedSocket() client) {
    Logger.verbose('Recieved message:' + message, 'Client');
    this.server.sockets.emit('event.recieved', message);
  }

  @SubscribeMessage('event.focused')
  listenTyping() {
    Logger.verbose('Client is now typing?', 'Client');
    this.server.sockets.emit('event.typing', 'Client is typing');
  }

  @SubscribeMessage('event.unfocused')
  listenFocusOut() {
    Logger.verbose('Client is not typing?', 'Client');
    this.server.sockets.emit('event.notTyping', 'Client is not typing');
  }
}
