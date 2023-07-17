import { Inject } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { TimeSlot } from '../../vets/entity/timeslot.entity';
import {
  CheckingDateCommand,
  SetTimeSlotCommand,
  TimeSlotResultCommand,
} from '../dto/timeslot.dto';

export class TimeSlotReposiotory extends Repository<TimeSlot> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(TimeSlot, dataSource.createEntityManager());
  }

  async getTimeSlots(date: CheckingDateCommand): Promise<TimeSlot[] | null> {
    return await this.find({
      select: { startTime: true, endTime: true, time: true },
      where: date,
    });
  }

  async setTimeSlots(date: SetTimeSlotCommand): Promise<InsertResult | null> {
    return await this.insert(date);
  }
}
