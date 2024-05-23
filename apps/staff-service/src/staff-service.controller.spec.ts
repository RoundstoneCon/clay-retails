import { Test, TestingModule } from '@nestjs/testing';
import { StaffServiceController } from './staff-service.controller';
import { StaffServiceService } from './staff-service.service';

describe('StaffServiceController', () => {
  let staffServiceController: StaffServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StaffServiceController],
      providers: [StaffServiceService],
    }).compile();

    staffServiceController = app.get<StaffServiceController>(StaffServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(staffServiceController.getHello()).toBe('Hello World!');
    });
  });
});
