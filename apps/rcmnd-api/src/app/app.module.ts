import { Module } from '@nestjs/common';
import {dinosaurModule} from '../../../../libs/backend/features/meal/src/lib/dinosaur/dinosaur.module';
import {userModule} from '../../../../libs/backend/features/meal/src/lib/user/user.module';
import {feedingScheduleModule} from '../../../../libs/backend/features/meal/src/lib/feedingSchedule/feedingSchedule.module';
import {areaModule} from '../../../../libs/backend/features/meal/src/lib/area/area.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [dinosaurModule, userModule, feedingScheduleModule, areaModule, MongooseModule.forRoot('mongodb://localhost/nest') ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
