import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import path, { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HotelRoomModule } from './hotel-room/hotel-room.module';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportRequestModule } from './support-request/support-request.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27018'),
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    UserModule,
    AuthModule,
    HotelModule,
    HotelRoomModule,
    ReservationModule,
    SupportRequestModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
