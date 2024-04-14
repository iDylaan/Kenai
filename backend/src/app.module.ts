import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { KenaiModule } from './kenai/kenai.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/'
    }),
    KenaiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
