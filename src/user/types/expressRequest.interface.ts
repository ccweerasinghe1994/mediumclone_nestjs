import type { Request } from 'express';
import { UserEntity } from '@app/user/user.entity';

interface IExpressRequest extends Request {
  user?: UserEntity;
}

export type { IExpressRequest };
