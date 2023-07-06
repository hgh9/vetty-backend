import { Inject, Injectable } from '@nestjs/common';
import { Reservation } from './entity/reservation.entity';
import { Between, DataSource, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { ReservastionsDto } from './dto/reservations.dto';
import { ReservationSearchDto } from './dto/reservation-search.dto';
import moment from 'moment';

@Injectable()
export class ReservationService {
  private reservationRepository: Repository<Reservation>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource
  ) {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
  }

  async create(data: ReservastionsDto): Promise<any> {
    // new Logger().verbose('create Reservations in repo', JSON.stringify(data));

    // const result = await this.reservationRepository.save(data);
    // console.log(result);
    // return {
    //   result: true,
    //   data: result,
    //   message: '예약이 완료되었습니다.',
    // };
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async getReservationsByUserId(userId: number, searchQuery: ReservationSearchDto): Promise<Reservation[]> {
    //TODO: QueryExtension 사용 불가능한지 확인 -> TypeScript, TypeOrm
    let query = {}; 
    query['userId'] = userId;
    if (searchQuery.startDate && searchQuery.endDate) {
      query['reservedAt'] = Raw((alias) => `DATE(${alias}) >= ${searchQuery.startDate} && DATE(${alias}) <= :endDate`, searchQuery);
    }
    console.log(`query: ${JSON.stringify(query)}`);
    return this.reservationRepository.findBy(query);
  }
}

interface FindOptionsWhere<Reservation>{

}
