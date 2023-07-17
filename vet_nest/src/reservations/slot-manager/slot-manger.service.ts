import { Injectable, Logger } from '@nestjs/common';
import { TimeSlotReposiotory } from '../repository/timeslot-repository';
import { CheckingDateCommand } from '../dto/timeslot.dto';
import { TimeSlot } from '../../vets/entity/timeslot.entity';
// import { TimeSlot } from "../../vets/entity/timeslot.entity";

export interface ITimeSlot {
  startTime?: string;
  endTime?: string;
  reserved: boolean;
}

export default class TimeSlotMananger {
  private timeSlot: ITimeSlot[] = [];
  private logger: Logger;
  constructor() {
    for (let i = 0; i < 24; i++) {
      this.timeSlot[i] = {
        reserved: false,
      };
    }
  }

  async getEmptySlot(timeSlotData: TimeSlot[]): Promise<ITimeSlot[]> {
    this.timeSlot.map((value, index) => {
      timeSlotData.map((timeSlotData) => {
        if (timeSlotData.time === index) {
          this.timeSlot[timeSlotData.time].reserved = true;
          this.timeSlot[timeSlotData.time].startTime = timeSlotData.startTime;
          this.timeSlot[timeSlotData.time].endTime = timeSlotData.endTime;
        }
      });
    });

    console.log(this.timeSlot);

    return this.timeSlot;
  }

  setTimeSlot(time: number): ITimeSlot[] {
    this.timeSlot.map((value, index) => {
      if (index === time) {
        value.reserved = true;
      }
    });

    return this.timeSlot;
  }
}
