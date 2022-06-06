import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(require('cors')())
  app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24*60*60*1000 // время жизни сессии
    }
  }))
  await app.listen(process.env.PORT);
}
bootstrap();
