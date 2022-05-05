import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! You can access my swagger docs at /api-docs.';
  }
}
