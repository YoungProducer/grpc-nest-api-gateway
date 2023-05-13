import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './lib/exception-filters/all-exception.filter';
import { RpcResponseInterceptor } from './lib/interceptors/rpc-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API GateWay')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  app.useGlobalInterceptors(new RpcResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionFilter());

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
