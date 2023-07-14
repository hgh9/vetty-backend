import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../reservations.service';
import { DataSource } from 'typeorm';
import { initializeDataSource } from '../../database/typeorm-maria-testing.module';
import { ReservationSearchDto } from '../dto/reservation-search.dto';
import * as moment from 'moment';
import { ReservationReposiotory } from '../repository/reservation-repository';
import { MockReservationRepository } from '../repository/reservation-repository.mock';

describe('ReservationsService', () => {
  let dataSource: DataSource;
  let service: ReservationService;

  beforeAll(async (): Promise<DataSource> => await initializeDataSource());
  afterAll(async (): Promise<void> => dataSource?.destroy());
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: ReservationReposiotory, 
          useClass: MockReservationRepository
        }
      ]
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('예약 목록을 조회한다.', () => {

    it('예약 목록을 조회하면 Reservation[]을 반환한다.', async () => {
      //Arrange
      const userId = 1; 
      const searchQuery = new ReservationSearchDto(); 
      searchQuery.startDate = moment().add(-7, 'days').format('YYYY-MM-DD'); 
      searchQuery.endDate   = moment().format('YYYY-MM-DD'); 
      //Act
      const reservations = await service.getReservationsByUser(userId, searchQuery); 
      //Assert
      expect(reservations.length).toBeGreaterThan(0);
    });
  });
});
