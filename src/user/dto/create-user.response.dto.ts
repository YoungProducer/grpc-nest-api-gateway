import { Exclude } from 'class-transformer';
import { BaseResponseDto } from 'grpc-nest-common';
import { CreateUserResponse } from 'src/proto/user.pb';

@Exclude()
export class CreateUserResponseDto
  extends BaseResponseDto
  implements CreateUserResponse {}
