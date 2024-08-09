import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('googleAuth.clientId'),
      clientSecret: configService.get<string>('googleAuth.secret'),
      callbackURL: configService.get<string[]>('googleAuth.callbackUrls'),
      scope: [ 'profile', 'email' ],
    });
  }

  async validate(_accessToken, _refreshToken, profile, _cb) {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    return user;
  }
}