import {
  Controller,
  Get,
  Post,
  Inject,
  OnModuleInit,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USER_SERVICE_NAME, UserServiceClient } from 'src/proto/user.pb';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { GetUserResponseDto } from './dto/get-user.response.dto';
import { ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController implements OnModuleInit {
  private svc: UserServiceClient;

  constructor(
    @Inject(USER_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.svc = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateUserRequestDto,
  })
  public async createUser(
    @Body() dto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const res = await firstValueFrom(this.svc.createUser(dto));
    return plainToInstance(CreateUserResponseDto, res);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({
    type: GetUserResponseDto,
  })
  public async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetUserResponseDto> {
    return await firstValueFrom(
      this.svc.getUser({
        id,
      }),
    );
  }
}
