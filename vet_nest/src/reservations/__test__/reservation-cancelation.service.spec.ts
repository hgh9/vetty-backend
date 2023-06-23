import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../reservation.service';
import { ReservationCancelationService } from '../reservation-cancelation.service';

describe('ReservationCancelationService', () => {
  let service: ReservationCancelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationCancelationService],
    }).compile();

    service = module.get<ReservationCancelationService>(
      ReservationCancelationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sut_예약 정보를 찾을 수 없다.', () => {
    // Arrange
    const reservationId = -1;

    // Act
    const reservation = service.getTargetReservation(reservationId);

    // Assert
    expect(reservation).toBeNull();
  });
});
