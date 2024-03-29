import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
