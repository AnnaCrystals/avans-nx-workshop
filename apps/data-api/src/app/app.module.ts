import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {dinosaurModule} from '../../../../libs/backend/features/meal/src/lib/dinosaur/dinosaur.module';
import {userModule} from '../../../../libs/backend/features/meal/src/lib/user/user.module';
import {areaModule } from '../../../../libs/backend/features/meal/src/lib/area/area.module';
import {feedingScheduleModule} from '../../../../libs/backend/features/meal/src/lib/feedingSchedule/feedingSchedule.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [dinosaurModule, userModule, areaModule, feedingScheduleModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/jurassic') ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
