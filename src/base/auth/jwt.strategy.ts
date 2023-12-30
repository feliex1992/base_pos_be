import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Singleton } from '../singleton';
import { UserService } from 'src/modules/user/domain/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const singleton = Singleton.getInstance();
    singleton.set({
      user: {
        id: payload.id,
        user_id: payload.user_id,
      },
    });

    // await this.moduleRef
    //   .get(UserService, { strict: false })
    //   .findOne(1);

    return {
      id: payload.id,
      user_id: payload.user_id,
    };
  }
}
