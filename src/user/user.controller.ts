import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseI } from '@app/user/types/user-response.interface';
import { LoginUserDto } from '@app/user/dto/LoginUserDto';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data',
    required: true,
    examples: {
      sample: {
        value: {
          username: 'John Doe',
          email: 'abc@gmail.com',
          password: 'asdasd',
        },
        description: 'User data',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity.' })
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseI> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildResponse(user);
  }
  @Post('users/login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseI> {
    return this.userService.login(loginUserDto);
  }
}
