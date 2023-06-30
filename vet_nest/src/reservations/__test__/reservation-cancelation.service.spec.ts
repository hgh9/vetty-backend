import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationService } from '../reservation-cancelation.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Reservation } from '../entity/reservation.entity';
import { PaymentFactoryService } from '../fake-modules/payment-factory.service';
import { FakePaymentService } from '../fake-modules/fake-payment.service';
import { DataSource } from 'typeorm';
import { initializeDataSource } from '../../database/typeorm-maria-testing.module';
import { IReservationsCancelation } from '../reservation-cancelation.interface';
import * as moment from 'moment';




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

    it('예약 취소가 성공하면, 성공한 예약 정보를 반환한다.', async () => {
      const reservationId = 1;
      const result = await service.cancelReservation(reservationId);
      //TODO: 현재 boolean을 반환하지만, Reservation 정보를 그대로 반환하도록 변경 ( 피드백 )
      expect(result).toEqual(true);
    });

    it('예약 정보를 찾을 수 없으면, undefined를 반환 한다.', async () => {
      // Arrange
      const reservationId = -1;
      
      const reservation = await service.getTargetReservation(reservationId);
      expect(reservation).toBeUndefined();
    });
  });
});
