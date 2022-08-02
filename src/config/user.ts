import { registerAs } from '@nestjs/config';

export default registerAs('user', () => ({
  salt: process.env.USER_SALT,
}));
