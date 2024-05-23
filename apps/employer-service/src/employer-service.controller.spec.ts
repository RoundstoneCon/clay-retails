import { Test, TestingModule } from '@nestjs/testing';
import { EmployerServiceController } from './employer-service.controller';
import { EmployerServiceService } from './employer-service.service';

describe('EmployerServiceController', () => {
  let employerServiceController: EmployerServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployerServiceController],
      providers: [EmployerServiceService],
    }).compile();

    employerServiceController = app.get<EmployerServiceController>(EmployerServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(employerServiceController.getHello()).toBe('Hello World!');
    });
  });
});
