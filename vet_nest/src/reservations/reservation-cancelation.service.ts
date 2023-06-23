import { Inject, Injectable } from '@nestjs/common';
import { Reservation } from '@/reservations/entity/reservation.entity';
import { ReservationService } from './reservation.service';
import { IReservationsCancelation } from './reservation-cancelation.interface';

@Injectable()
// -> ReservationCancelationRepositoryService
export class ReservationCancelationService implements IReservationsCancelation {
  constructor(private reservationService: ReservationService) {}

  async cancelReservation(reservationId: number): Promise<boolean> {
    //1. 예약정보를 조회한다.
    const reservation = await this.getTargetReservation(reservationId);
    if (reservation == null) return false;

    //1-1. 예약 상태를 확인한다.

    //1-2. 예약 취소가능 시간인지 확인한다.

    //2. 결제를 취소 한다.

    //2-1. 결제 상태를 확인한다.

    //2-2. 결제 취소를 요청한다.

    //3. 성공 시, 결제 취소 알림 메시지를 송신한다.

    //4. 예약 취소 알림 메시지를 송신한다.
    return Promise.resolve(true);
  }

  public async getTargetReservation(id: number): Promise<Reservation> {
    const reservations = await this.reservationService.findAll();
    const reservation = reservations.find((value) => value.id == id);

    if (reservation == null) throw Error('예약 정보를 찾을 수 없습니다.');
    return reservation;
  }
}
