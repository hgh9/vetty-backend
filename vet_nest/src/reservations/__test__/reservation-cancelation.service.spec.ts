import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationService } from '../reservation-cancelation.service';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Reservation } from '../entity/reservation.entity';
import { Payment } from '../entity/payment.entity';
import { DatabaseModule } from '../../database/database.module';
import { PaymentFactoryService } from '../fake-modules/payment-factory.service';
import { FakePaymentService } from '../fake-modules/fake-payment.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Photo } from '../../photos/entity/photos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMMariaSqlTestingModule, initializeDataSource } from '../../database/typeorm-maria-testing.module';
import { IReservationsCancelation } from '../reservation-cancelation.interface';
import { ReservationService } from '../reservations.service';
import * as moment from 'moment';
import { EmptyError } from 'rxjs';
import { databaseProviders } from '@configs';



describe('ReservationCancelationService', () => {
  class MockReservationCancelationService implements IReservationsCancelation
  {
    cancelReservation(reservationId: number): Promise<boolean> {
      return Promise.resolve(true);
    }
    getTargetReservation(reservationId: number): Promise<Reservation> {
      // if (reservationId == -1) {
      //   throw new NotFoundException('예약 정보를 찾을 수 없습니다.');
      // }
      return Promise.resolve(new Reservation());
    }
    private isReservationCancelableTime(reservedAt: Date): boolean {
      const TIME_LIMIT = -1;
      const limit = moment(reservedAt).add(TIME_LIMIT, 'hours');
      const current = moment();
      return current.isBefore(limit);
    }
  }

  let dataSource: DataSource
  let service: ReservationCancelationService;
  
  beforeAll(async (): Promise<DataSource> => await initializeDataSource());
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
  // afterAll(async(): Promise<void> => dataSource.destroy());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('예약을 취소한다.', () => {

    it('예약 정보를 찾을 수 없으면, NotFoundException을 throw 한다.', async () => {
      // Arrange
      const reservationId = 1;

      expect(async () => await service.getTargetReservation(reservationId))
      .toThrowError(NotFoundException);
      // Act
      try {
        const reservation = await service.getTargetReservation(reservationId);
        console.log(`reservation: ${reservation}`);
      } catch (e) {
        // Assert
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('예약 정보를 찾을 수 없습니다.');
      }
    });

    it('예약이 취소 가능한 상태를 확인한다.', async () => {
      
      
    });

    //PASS: 결제를 취소한다.

    it('결제 상태를 확인한다.', async () => {
      // Given
      const reservationId = 1;

      // When
      // const payments =
      //   await service.getCompletedPaymentsByReservationId(
      //     reservationId,
      //   );

      // // Then
      // expect(payments.length).toBeGreaterThan(0);
    });

    it('PG 결제 장애 발생', async () => {
      //TODO: fake payment service -> factory
    });

    it('메시지 서버 장애 발생', async () => {
      //TODO: fake message service -> factory
    });
  });
});
