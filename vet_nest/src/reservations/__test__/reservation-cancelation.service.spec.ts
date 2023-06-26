import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationService } from '../reservation-cancelation.service';
import { InternalServerErrorException } from '@nestjs/common';
import { Reservation } from '../entity/reservation.entity';
import { Payment } from '../entity/payment.entity';
import { AppModule } from '../../app.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ReservationsController } from '../reservations.controller';
import { findByEmailDto } from '../dto/reservations.dto';
import { ReservationService } from '../reservations.service';
import config from '../../../config/config';

describe('ReservationCancelationService', () => {
  let service: ReservationService;
  let reservationCancelationService: ReservationCancelationService;

  class MockUserRepository {
    #data = [
      {
        id: 1,
        vetName: 'hah',
        vetHahah: 'diasm2@gmail.com',
        vetPopo: 'popo',
        views: 1,
        isPublished: true,
        status: 'haha',
      },
    ];
    async findByEmail(email: findByEmailDto): Promise<any> {
      const data = this.#data.find((v) => v.vetHahah === email.vetHahah);
      if (data) {
        return data;
      }
      return null;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(config().testDbConfig)],
      controllers: [ReservationsController],
      providers: [
        AppModule,
        ReservationService,
        ReservationCancelationService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(Payment),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationCancelationService = module.get<ReservationCancelationService>(
      ReservationCancelationService,
    );
  });

  it('typeorm', async () => {
    const info: findByEmailDto = {
      vetHahah: 'diasm2@gmail.com',
    };
    const result = await service.findByEmail(info);

    expect(service.findByEmail(info)).resolves.toStrictEqual({
      id: 1,
      vetName: 'hah',
      vetHahah: 'diasm2@gmail.com',
      vetPopo: 'popo',
      views: 1,
      isPublished: true,
      status: 'haha',
    });
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
      } catch (e) {
        // Assert
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e.message).toBe('예약 정보를 찾을 수 없습니다.');
      }
    });

    it('예약이 취소 가능한 상태를 확인한다.', async () => {
      // Given
      const reservationId = 1;

      // When
      const reservation =
        await reservationCancelationService.getTargetReservation(reservationId);

      // Then
      expect(reservation.status).toEqual('C');
    });

    //PASS: 결제를 취소한다.

    it('결제 상태를 확인한다.', async () => {
      // Given
      const reservationId = 1;

      // When
      const payments =
        await reservationCancelationService.getCompletedPaymentsByReservationId(
          reservationId,
        );

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
