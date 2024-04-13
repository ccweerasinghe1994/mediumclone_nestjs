import { UserType } from '@app/user/types/user.type';

export interface UserResponseI {
  user: UserType & { token: string };
}
