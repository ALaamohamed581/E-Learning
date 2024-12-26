import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

declare module 'socket.io' {
  interface Socket {
    userId?: number; // Adding custom property to Socket
  }
}

@Injectable()
export class SocketAuth {
  constructor(private readonly jwt: JwtService) {}

  async use(client: Socket, next: (err?: Error) => void) {
    try {
      // Retrieve the token from the handshake headers
      const authHeader = client.handshake.headers['authorization'];

      if (!authHeader) {
        return next(new Error('Authorization header is missing'));
      }

      // Extract the token from the "Bearer <token>" format
      const token = authHeader;
      if (!token) {
        return next(new Error('Token is missing or malformed'));
      }

      // Decode and verify the JWT token
      const decoded = await this.jwt.verifyAsync(token, {
        secret: process.env.ADMIN_AUTH_TOKEN_SECRET as string,
      });
      console.log(decoded);
      if (!decoded || !decoded.payload.id) {
        return next(new Error('Invalid or expired token'));
      }

      // Attach the decoded userId to the client
      client.userId = decoded.payload.id;
      console.log(typeof client);
      // Proceed to the next middleware or connection handler
    } catch (error) {
      console.error('SocketAuth Error:', error.message);
      next(new Error('Authentication failed'));
    }
  }
}
