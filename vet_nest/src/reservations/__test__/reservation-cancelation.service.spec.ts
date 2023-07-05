import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationService } from '../reservation-cancelation.service';
import { PaymentFactoryService } from '../fake-modules/payment-factory.service';
import { FakePaymentService } from '../fake-modules/fake-payment.service';
import { DataSource } from 'typeorm';
import { initializeDataSource } from '../../database/typeorm-maria-testing.module';
import { Reservation, TreatmentStatus } from '../entity/reservation.entity';




describe('ReservationCancelationService', () => {

  let dataSource: DataSource
  let service: ReservationCancelationService;
  
  beforeAll(async (): Promise<DataSource> => await initializeDataSource());
  afterAll(async (): Promise<void> => dataSource?.destroy());
  beforeEach(async () => {
    let module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE', 
          useFactory: (() => initializeDataSource())
        },
        PaymentFactoryService,
        FakePaymentService,
        {
          provide : ReservationCancelationService,
          useClass: ReservationCancelationService
        }
      ]
    }).compile();

    service = module.get<ReservationCancelationService>(ReservationCancelationService);
  });

  describe('예약을 취소한다.', () => {

    it('예약 취소가 성공하면, 진료 상태가 취소 완료 상태를 반환한다.', async () => {
      const reservationId = 1;
      const reservation = await service.cancelReservation(reservationId);
      expect(reservation.status).toEqual(TreatmentStatus.RESERVATION_CANCELED);
    });
  });
});
