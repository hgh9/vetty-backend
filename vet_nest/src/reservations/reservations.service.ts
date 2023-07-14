import { Injectable, Logger } from '@nestjs/common';
import { Reservation } from './entity/reservation.entity';
import { ReservastionsDto } from './dto/reservations.dto';
import { ReservationSearchDto } from './dto/reservation-search.dto';
import { ReservationReposiotory } from './repository/reservation-repository';
import TimeSlotMananger, {
  ITimeSlot,
} from './slot-manager/slot-manger.service';
import { CheckingDateCommand, SetTimeSlotCommand } from './dto/timeslot.dto';
import { TimeSlotReposiotory } from './repository/timeslot-repository';

@Injectable()
export class ReservationService {
  // private reservationRepository: Repository<Reservation>;
  logger = new Logger();
  constructor(
    private readonly reservationRepository: ReservationReposiotory,
    private readonly timeSlotRepository: TimeSlotReposiotory,
  ) {
    // this.reservationRepository = this.dataSource.getRepository(Reservation);
  }

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

  async setReservation(data: ReservastionsDto): Promise<any> {
    this.logger.verbose('create Reservations in repo', JSON.stringify(data));
    const result = await this.reservationRepository.save(data);
    console.log(result);
    return {
      result: true,
      data: result,
      message: '예약이 완료되었습니다.',
    };
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
      searchQuery.endDate,
    );
  }
}
