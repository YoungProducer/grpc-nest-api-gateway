import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: [UserModule],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
