import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema, User } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])] ,
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class userModule {}


// import { Module } from "@nestjs/common";
// import { UserService } from "./user.service";
// import { UserController } from "./user.controller";

// @Module({
//     controllers: [UserController],
//     providers: [UserService],
//     exports: [UserService],
// })

// export class userModule {}
