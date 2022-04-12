import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
  ) // @Inject('CUSTOM_KEY') private readonly customValue,
  // custom key 사용할때
  {}
  getHello(): string {
    return this.configService.get('NAME');
  }
}
