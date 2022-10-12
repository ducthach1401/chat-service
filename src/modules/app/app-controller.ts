import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/app/decorators/metadata';
import { AppService } from './app-service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
