import * as moment from "moment";
import { Reservation, TreatmentStatus } from "../entity/reservation.entity";
import { BusinessException } from "util/exception.util";

export default class ReservationCancelationValidator {

    static validate(reservation?: Reservation): boolean {
        if (!reservation) {
            throw new BusinessException(null, '예약정보를 찾을 수 없습니다.', '404');
        }

        if (!this.checkCancelableTime(reservation.reservedAt)) {
            throw new BusinessException(null, '취소 가능 시간이 아닙니다.', '403');
        }

        if (reservation?.status != TreatmentStatus.RESERVATION_COMPLETED) {
            throw new BusinessException(null, '취소 가능 상태가 아닙니다.', '403');
        }
        return true;
    }

    static checkCancelableTime(reservationDate: Date): boolean {
        const reservedAt = moment(reservationDate);
        const limit = reservedAt.add(-1, 'hours');
        const current = moment();
        return current.isBefore(limit);
    }
}