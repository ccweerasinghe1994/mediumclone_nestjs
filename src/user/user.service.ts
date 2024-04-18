import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { IUserResponse } from '@app/user/types/user-response.interface';
import { LoginUserDto } from '@app/user/dto/LoginUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const isEmailAlreadyExists = await this.getUserByEmail(createUserDto.email);
    const isUserNameAlreadyExists = await this.getUserByUserName(
      createUserDto.username,
    );
    if (isEmailAlreadyExists || isUserNameAlreadyExists) {
      throw new HttpException(
        'username or email already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return this.userRepository.save(newUser);
  }

  getJwtToken({ username, id, email }: UserEntity): string {
    const payload = { username, id, email };

    return sign(payload, JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'username', 'email', 'password', 'bio', 'image'],
    });
  }

  async getUserByUserName(username: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async buildResponse(user: UserEntity): Promise<IUserResponse> {
    return {
      user: {
        ...user,
        token: this.getJwtToken(user),
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<IUserResponse> {
    const user = await this.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new HttpException(
        'invalid email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException(
        'invalid email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    delete user.password;
    return this.buildResponse(user);
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }
}
