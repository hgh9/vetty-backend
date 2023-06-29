import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { DataSource, Repository } from 'typeorm';
import { ReservastionsDto, findByEmailDto } from './dto/reservations.dto';
import { Payment } from './entity/payment.entity';

@Injectable()
export class ReservationService {
  private reservationRepository: Repository<Reservation>;
  private paymentRepository: Repository<Payment>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource, // @InjectRepository(Reservation) // private readonly reservationReposiotory: Repository<Reservation>, // @InjectRepository(Payment)
  ) // private readonly paymentReposiotory: Repository<Payment>,
  {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
  }

  async create(data: ReservastionsDto): Promise<any> {
    return this.reservationRepository.save(data);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async findByEmail(email: findByEmailDto): Promise<any> {
    // const result = await this.reservationReposiotory.findOneBy(email);

    const result = {
      id: 1,
      vetName: 'hah',
      vetHahah: 'diasm2@gmail.com',
      vetPopo: 'popo',
      views: 1,
      isPublished: true,
      status: 'haha',
    };

    return result;
  }
}
