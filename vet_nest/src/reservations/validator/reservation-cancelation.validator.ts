import * as moment from "moment";
import { Reservation, TreatmentStatus } from "../entity/reservation.entity";
import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { Logger } from "winston";

export default class ReservationCancelationValidator {

    static validate(reservation?: Reservation): boolean {
        if (!reservation) {
            throw new NotFoundException('예약정보를 찾을 수 없습니다.');
        }

        if (!this.checkCancelableTime(reservation.reservedAt)) {
            throw new ForbiddenException('취소 가능 시간이 아닙니다.');
        }

        if (reservation?.status != TreatmentStatus.RESERVATION_COMPLETED) {
            throw new BadRequestException('취소 가능 상태가 아닙니다.');
        }
        return true;
    }

    static checkCancelableTime(reservationDate: Date): boolean {
        const reservedAt = moment(reservationDate);
        const limit = reservedAt.add(-1, 'hours');
        const current = moment();
        console.log(`currentIsUtc: ${current.utcOffset()}`);
        console.log(`limitIsUtc: ${limit.utcOffset()}`);
        console.log(`current: ${current.toISOString()}`);
        console.log(`limit: ${limit.toISOString()}`);
        console.log(`isCancelableTime: ${current.isBefore(limit)}`);
        return current.isBefore(limit);
    }
}