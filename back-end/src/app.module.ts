import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HotelModule } from './hotel/hotel.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27018'),
    UserModule,
    AuthModule,
    HotelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
