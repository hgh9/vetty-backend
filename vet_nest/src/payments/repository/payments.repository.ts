import { Repository, DataSource, EntityRepository } from 'typeorm';
import { Payment } from '../entity/payments.entity';
import { Inject } from '@nestjs/common';

@EntityRepository(Payment)
export class PaymentsRepository extends Repository<Payment>
{
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource
  ) {
    super(Payment, dataSource.createEntityManager());
  }
  
  async findByPaymentId(paymentId) {
    return await this.findOneBy({ paymentId });
  }
  
  async createPayment(reservationId, amount) {
    const newPayment = this.create({
      reservationId,
      amount,
      status: 'progress',
    });
    await this.save(newPayment);
    return newPayment;
  }
  
  async done(paymentId) {
    return await this.update(paymentId, { status: 'done' });
  }
  
  async cancel(paymentId) {
    return await this.update(paymentId, {
      status: 'canceled',
      canceledAt: new Date(),
    });
  }
  
  async refund(paymentId) {
    return await this.update(paymentId, { status: 'refund' });
  }
}