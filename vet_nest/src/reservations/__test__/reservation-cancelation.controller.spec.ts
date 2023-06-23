import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationController } from '../reservation-cancelation.controller';

describe('ReservationCancelationController', () => {
  let controller: ReservationCancelationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationCancelationController],
    }).compile();

    controller = module.get<ReservationCancelationController>(ReservationCancelationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
