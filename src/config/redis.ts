import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: process.env.HOST,
  port: process.env.PORT,
}));
