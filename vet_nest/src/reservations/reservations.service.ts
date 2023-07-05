import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { DataSource, Repository } from 'typeorm';
import { ReservastionsDto } from './dto/reservations.dto';
import { Payment } from './entity/payment.entity';

@Injectable()
export class ReservationService {
  private reservationRepository: Repository<Reservation>;
  private paymentRepository: Repository<Payment>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource, // @InjectRepository(Reservation) // private readonly reservationReposiotory: Repository<Reservation>, // @InjectRepository(Payment) // private readonly paymentReposiotory: Repository<Payment>,
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
}
