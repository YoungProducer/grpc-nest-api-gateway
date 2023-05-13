import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'grpc-nest-common';

@Exclude()
export class GetUserResponseDto
  extends BaseResponseDto
  implements GetUserResponseDto
{
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  email: string;
}
