/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface EmptyMessage {
}

export interface CreateUserRequest {
  username: string;
  email: string;
}

export interface GetUserRequest {
  id?: number | undefined;
  username?: string | undefined;
  email?: string | undefined;
}

export interface GetUserResponse {
  id: number;
  username: string;
  email: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  createUser(request: CreateUserRequest): Observable<EmptyMessage>;

  getUser(request: GetUserRequest): Observable<GetUserResponse>;
}

export interface UserServiceController {
  createUser(request: CreateUserRequest): Promise<EmptyMessage> | Observable<EmptyMessage> | EmptyMessage;

  getUser(request: GetUserRequest): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "getUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
