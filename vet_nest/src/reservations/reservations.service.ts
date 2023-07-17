import { Inject, Injectable } from '@nestjs/common';
import { Reservation } from './entity/reservation.entity';
import { ReservastionsDto as ReservastionsCommand } from './dto/reservations.dto';
import { ReservationSearchDto } from './dto/reservation-search.dto';
import { ReservationReposiotory } from './repository/reservation-repository';
import  TimeSlotMananger, { ITimeSlot} from './slot-manager/slot-manger.service';
import { CheckingDateCommand, SetTimeSlotCommand } from './dto/timeslot.dto';
import { TimeSlotReposiotory } from './repository/timeslot-repository';
import { FailedPost } from '../../util/exception.util';
import { Payment } from '@/payments/entity/payments.entity';
import { Logger } from 'winston';

@Injectable()
export class ReservationService {
  logger = new Logger();
  constructor(
    private readonly reservationRepository: ReservationReposiotory,
    private readonly timeSlotRepository: TimeSlotReposiotory,
  ) {}

  async setReserveTime(timeSlotInfo: SetTimeSlotCommand): Promise<boolean> {
    const result = await this.timeSlotRepository.setTimeSlots(timeSlotInfo);
    if (result) return true;
    return false;
  }

  async getAvailableTime(info: CheckingDateCommand): Promise<ITimeSlot[]> {
    const timeSlotManager = new TimeSlotMananger();
    const timeSlotData = await this.timeSlotRepository.getTimeSlots(info);
    const result = timeSlotManager.getEmptySlot(timeSlotData);
    return result;
  }

  async setReservation(reservationData: ReservastionsCommand): Promise<any> {
    try {
      return await this.reservationRepository.postReservation(reservationData);
    } catch (err) {
      throw new FailedPost(err, 'set reservation failed');
    }
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async getReservationsByUser(
    userId: number,
    searchQuery: ReservationSearchDto,
  ): Promise<Reservation[]> {
    //TODO: QueryExtension 사용 불가능한지 확인 -> TypeScript, TypeOrm
    return this.reservationRepository.getReservationsByUser(
      userId,
      searchQuery.startDate,
      searchQuery.endDate);
  }

  async getPaymentsByReservationId(reservationId: number): Promise<Payment[]> {
    return await this.reservationRepository.getPaymentsByReservationId(reservationId);
  }
  
}
