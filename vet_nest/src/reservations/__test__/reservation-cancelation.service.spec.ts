import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../reservation.service';
import { ReservationCancelationService } from '../reservation-cancelation.service';
import { InternalServerErrorException } from '@nestjs/common';
import { async } from 'rxjs';
// import { ReservationsModule } from '../reservations.module';


describe('ReservationCancelationService', () => {
  let reservationCancelationService: ReservationCancelationService;
  let reservationService: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationCancelationService
      ]
    }).compile();

    reservationCancelationService = module.get<ReservationCancelationService>(
      ReservationCancelationService
    );
  });

  it('should be defined', () => {
    expect(reservationCancelationService).toBeDefined();
  });

  describe('예약을 취소한다.', () => {
    
    it('예약 정보를 찾을 수 없다.', async () => {
      // Arrange
      const reservationId = -1;

      // Act
      try {
        await reservationCancelationService.getTargetReservation(reservationId);
      }
      catch(e) {
        
        // Assert 
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e.message).toBe('예약 정보를 찾을 수 없습니다.')
      }
    });

    it('예약이 취소 가능한 상태를 확인한다.', async () => {
      // Given 
      const reservationId = 1;
      
      // When 
      const reservation = await reservationCancelationService.getTargetReservation(reservationId);

      // Then 
      expect(reservation.status).toEqual('C');
    });

    //PASS: 결제를 취소한다. 

    it('결제 상태를 확인한다.', async () => {
      // Given
      const reservationId = 1;

      // When 
      const payments = await reservationCancelationService.getCompletedPaymentsByReservationId(reservationId);

      // Then 
      expect(payments.length).toBeGreaterThan(0);
    });

    it('PG 결제 장애 발생', async () => {
      //TODO: fake payment service -> factory
    }); 

    it('메시지 서버 장애 발생', async () => {
      //TODO: fake message service -> factory 
    });
    
  });
});
