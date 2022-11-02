import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtResponse, UserType } from '../strategies/jwt.constants';

import config from '../../config/config';

// import {
//   JwtPayload,
//   JwtResponse,
//   UserType,
// } from '@auth/strategies/jwt.constants';

// import config from '@config/config';

@Injectable()
export default class AuthTokenService extends JwtService {
  public createTokens(address: string): JwtResponse {
    address = address.toLowerCase();
    const type = UserType.USER;

    const payload: JwtPayload = {
      address,
      type,
    };

    const accessToken = super.sign(payload, {
      secret: config.auth.jwt.access.secret,
      expiresIn: config.auth.jwt.access.lifetime,
    });

    const refreshToken = super.sign(payload, {
      secret: config.auth.jwt.refresh.secret,
      expiresIn: config.auth.jwt.refresh.lifetime,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
