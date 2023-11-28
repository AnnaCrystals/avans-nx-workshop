import { Test, TestingModule } from '@nestjs/testing';
import { FeedingScheduleController } from './feedingSchedule.controller';

describe('FeedingScheduleController', () => {
  let controller: FeedingScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedingScheduleController],
    }).compile();

    controller = module.get<FeedingScheduleController>(FeedingScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});