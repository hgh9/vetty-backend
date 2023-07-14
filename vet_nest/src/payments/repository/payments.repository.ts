import { Repository, DataSource, EntityRepository } from 'typeorm';
import { Payment } from '../entity/payments.entity';
import { Inject, Logger } from '@nestjs/common';

@EntityRepository(Payment)
export class PaymentsRepository extends Repository<Payment>
{
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource
  ) {
    super(Payment, dataSource.createEntityManager());
  }
  
  async findByReservationId(reservationId) {
    try {
      return await this.findOne({ where: { reservationId } });
    }
    catch (error) {
      const aa = new Logger();
      aa.log(error);
    }
  }

  async findByPaymentId(paymentId) {
    return await this.findOneById(paymentId);
  }

  async createPayment(reservationId, amount, appId) {
    const newPayment = this.create({
      reservationId,
      amount,
      appId,
      status: 'done',
      method: 'CARD',
    });
    await this.save(newPayment);
    return newPayment;
  }
  
  async refund(paymentId) {
    return await this.update(paymentId, { status: 'refund' });
  }
}