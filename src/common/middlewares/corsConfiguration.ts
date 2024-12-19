import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
@Injectable()
export class CorsConfiguration implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Keep-Alive', 'timeout=60');
    cors(corsOptions);
    next();
  }
}
