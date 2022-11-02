import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import config from '../../config/config';

import { JwtPayload } from './jwt.constants';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.auth.jwt.access.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
