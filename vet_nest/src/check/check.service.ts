import { DataSource, Repository } from 'typeorm';
import { Reservation } from '../reservations/entity/reservation.entity';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentFactoryService } from '@/reservations/fake-modules/payment-factory.service';
import { Pet } from '../pets/entity/pet.entity';

// 예약정보를 조회하는 비지니스 로직 담당
@Injectable()
export class CheckService {
  private reservationRepository: Repository<Reservation>;
  private petRepository: Repository<Pet>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
    this.petRepository = this.dataSource.getRepository(Pet);
  }

  public async getAllReservations() {
    const getAllReservation = await this.reservationRepository.find();
    return getAllReservation;
  }

  //고객의 진료 목록을 조회한다.
  async findById(id: number) {
    const pet = await this.reservationRepository.findOne({
      where: {
        id,
      },
    });
    return pet;
  }

  // 진료 상태를 변경한다.
  async updateUserState(param, updateinfo: Reservation) {
    const reservationInfo = await this.reservationRepository.findOne({
      where: {
        id: param.id,
      },
    });

    console.log('reservation', reservationInfo);
    if (reservationInfo === null) {
      throw new Error('저장된 예약정보가 없습니다.');
    }

    reservationInfo.status = updateinfo.status;
    reservationInfo.updatedAt = updateinfo.updatedAt;
    this.reservationRepository.save(reservationInfo);

    return reservationInfo;
  }
}
