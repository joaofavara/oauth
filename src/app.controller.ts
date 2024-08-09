import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Res,
  HttpStatus,
  Req,
  Injectable
} from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { GoogleOauthGuard } from './auth/google.guard';

@Controller('auth/')
export class AppController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(req.body.username, req.body.password)
    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleAuth(@Req() req, @Res() res: Response) {
    const token = await this.jwtService.sign(req.user);
  
    res.cookie('oauth_token_test', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.send().status(HttpStatus.OK);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
