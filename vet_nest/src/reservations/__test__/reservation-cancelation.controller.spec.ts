import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationController } from '../reservation-cancelation.controller';
import { ReservationService } from '../reservations.service';
import { ReservationCancelationService } from '../reservation-cancelation.service';
import { AppModule } from '../../app.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import config from '../../../config/config';
import { Reservation } from '../entity/reservation.entity';
import { ForbiddenException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import exp from 'constants';

describe('ReservationCancelationController', () => {
  let controller: ReservationCancelationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationCancelationController]
    }).compile();

    controller = module.get<ReservationCancelationController>(ReservationCancelationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('예약취소', () => {

    it('예약 취소를 요청하고 결과를 반환한다.', async () => {
      //Arrange 
      const reservationId = 1;

      //Act 
      var result = await controller.cancelReservation(reservationId);
      
      //Assert 
      expect(result).toEqual({
        result: true, 
        message: '예약이 취소되었습니다.'
      });
    });

    it('예약id에 해당하는 예약정보를 찾을 수 없는 경우 실패(400)에러를 반환한다. - cancelReservation', async () => {
      //Arrange
      const reservationId = -1;
 
      //Act 
      const resultTask = controller.cancelReservation(reservationId);

      //Assert
      await expect(resultTask)
        .toThrowError(new InternalServerErrorException('예약정보를 찾을 수 없습니다.'));
    });

    it('예약 시간이 한 시간 이내로 남은 경우 실패(403) 에러를 반환한다. - cancelReservation', async () => {
      //Arrange 
      const reservationId = 1;

      //Act 
      const resultTask = controller.cancelReservation(reservationId);

      //Assert 
      await expect(resultTask)
        .toThrowError(new ForbiddenException('예약 취소는 한 시간 이상 남아 있을 경우에만 취소가 가능합니다.'));
    });
  });
});
