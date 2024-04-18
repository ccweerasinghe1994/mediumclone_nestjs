import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUserResponse } from '@app/user/types/user-response.interface';
import { LoginUserDto } from '@app/user/dto/LoginUserDto';
import { IExpressRequest } from '@app/user/types/expressRequest.interface';

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
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildResponse(user);
  }
  @Post('users/login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginUserDto: LoginUserDto): Promise<IUserResponse> {
    return this.userService.login(loginUserDto);
  }

  @Get('user')
  async getCurrentUser(@Req() req: IExpressRequest): Promise<IUserResponse> {
    console.log('req.user', req.user);
    return this.userService.buildResponse(req.user);
  }
}
