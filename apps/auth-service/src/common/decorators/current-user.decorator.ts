import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Document } from 'mongoose';

// Define a generic type for the User entity
type UserEntity = Document;

export const getCurrentUserByContext = <T extends UserEntity>(
  context: ExecutionContext,
): T => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user as T;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user as T;
  }
  // You can add other context types as needed
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext<UserEntity>(context),
);
