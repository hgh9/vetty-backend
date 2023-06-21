import { ReservationEntity } from '../entity/reservation.entity';

describe('Reservation', () => {
  it('should be defined', () => {
    expect(new ReservationEntity()).toBeDefined();
  });
});
