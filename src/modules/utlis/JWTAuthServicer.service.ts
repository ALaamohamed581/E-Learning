import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenData } from 'src/typse/token.types';

@Injectable()
export class JWTAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokens(tokens: Token[]) {
    const genratedTokens = tokens.map((token) =>
      this.jwtService.sign(
        { payload: token.payload },
        {
          secret: token.secret,
          expiresIn: token.expiresIn,
        },
      ),
    );
    return genratedTokens;
  }

  VerifyAuthToken({ token, secret }: TokenData) {
    const decoade = this.jwtService.verify(token, {
      secret,
    });
    return decoade;
  }
}
