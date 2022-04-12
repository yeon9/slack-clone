import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
// 라우터보다 먼저 실행되는 미들웨어
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  //  http관련 요청은

  // 실행순서 1
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    // 실행순서 3 (비동기라서 라우터 모듈 실행 후 실행된다)
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    // 실행순서 2
    next();
  }
}
