import { Module } from "@nestjs/common";
import { DinosaurService } from "./dinosaur.service";
import { DinosaurController } from "./dinosaur.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { DinosaurSchema, Dinosaur } from './schemas/dinosaur.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Dinosaur', schema: DinosaurSchema }])] ,
      controllers: [DinosaurController],
      providers: [DinosaurService],
      exports: [DinosaurService],
})


export class dinosaurModule {}