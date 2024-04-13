import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'username',
    description: 'The name of the user',
    required: true,
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty()
  readonly username: string;
  @ApiProperty({
    name: 'email',
    description: 'The email of the user',
    required: true,
    type: String,
    example: 'abc@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    name: 'password',
    description: 'The password of the user',
    required: true,
    type: String,
    example: 'asdasd',
  })
  @IsNotEmpty()
  readonly password: string;
}
