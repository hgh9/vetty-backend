import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationService } from '../reservation-cancelation.service';

describe('ReservationCancelationService', () => {
  let service: ReservationCancelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationCancelationService],
    }).compile();

    service = module.get<ReservationCancelationService>(ReservationCancelationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
