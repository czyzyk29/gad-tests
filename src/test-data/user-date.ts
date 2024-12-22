import { LoginUser } from '../models/user.model';

export const testUser1: LoginUser = {
  userEmail: process.env.USER_EMAIL ?? 'Not set',
  userPassword: process.env.USER_PASSWORD ?? 'Not set',
};
