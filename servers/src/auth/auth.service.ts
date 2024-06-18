import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto,RegisterDto, WXSignInDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  
  async wxSignIn(wxSignInDto: WXSignInDto) {
    const user = await this.usersService.findOne(wxSignInDto);
    if (!user) {
      throw new UnauthorizedException("未查询到该用户");
    }
    const payload = { sub: user.id, username: user.name };
    return {
      user,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto);
    if (!user) {
      throw new UnauthorizedException("未查询到该用户");
    }
    const payload = { sub: user.id, username: user.name };
    return {
      user,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto:RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const payload = { sub: user.id, username: user.name };
    return {
      user,
      token: await this.jwtService.signAsync(payload),
    };
  }
}