import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

declare module 'socket.io' {
  interface Socket {
    userId?: number;
    role?: string; // Adding custom property to Socket
  }
}

@Injectable()
export class SocketAuth {
  constructor(private readonly jwt: JwtService) {}

  async use(client: Socket, next: (err?: Error) => void) {
    try {
      // Retrieve the token from the handshake headers
      console.log(client.handshake.query.role);
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
        secret:
          process.env[
            `${(client.handshake.query.role as string).toUpperCase()}_AUTH_TOKEN_SECRET`
          ],
      });
      console.log(decoded);
      if (!decoded || !decoded.payload.id) {
        return next(new Error('Invalid or expired token'));
      }

      // Attach the decoded userId to the client
      client.userId = decoded.payload.id;

      client.role = client.handshake.query.role as string;
      console.log(typeof client);
      // Proceed to the next middleware or connection handler
    } catch (error) {
      console.error('SocketAuth Error:', error.message);
      next(new Error('Authentication failed'));
    }
  }
}
