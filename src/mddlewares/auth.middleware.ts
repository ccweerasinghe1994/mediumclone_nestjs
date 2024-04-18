import { Injectable, NestMiddleware } from '@nestjs/common';
import { IExpressRequest } from '@app/user/types/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserService } from '@app/user/user.service';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IExpressRequest, IExpressRequest: any, next: () => void) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token: string = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, JWT_SECRET);
      const id: number = (decode as UserEntity).id;
      const user = await this.userService.getUserById(id);
      req.user = user;
      next();
      return;
    } catch (error) {
      console.error('error', error);
      req.user = null;
      next();
    }
  }
}
