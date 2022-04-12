import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import axios from 'axios';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './app.middleware';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { WorkspacesController } from './workspaces/workspaces.controller';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { UsersService } from './users/users.service';
import { DmsService } from './dms/dms.service';

const getEnv = async () => {
  const response = await axios.get('/requestSecretKey');
  return response.data;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true /*load: [getEnv] */ }),
    UsersModule,
    ChannelsModule,
    WorkspacesModule,
    DmsModule,
    WorkspacesModule,
  ],
  //  .env파일을 외부에 두고 데이터를 가져올 때 비동기로 가져오게 됨, 이럴 때 load를 사용하면 된다
  controllers: [AppController, WorkspacesController],
  providers: [AppService, DmsService, UsersService],
  // @Injectable()을 사용하고 있는 애라면 providers에 넣어줘야 함
  /* providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: 'CUSTOM_KEY',
      useValue: 'CUSTOM_VALUE',
    },
  ],*/
})
export class AppModule implements NestModule {
  // middleware는 consumer에 연결
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
