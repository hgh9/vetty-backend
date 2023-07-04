// import {
//   Column,
//   Entity,
//   ManyToOne,
//   OneToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Reservation } from './reservation.entity';
// import { Vet } from '../../vets/entity/vet.entity';
// import { TimeSlot } from './timeslot.entity';

// @Entity()
// export class ReservationTime {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   reservationId: number;

//   @Column()
//   date: Date;

//   @Column()
//   timSlotId: number;

//   @Column()
//   vetId: number;

//   @ManyToOne(() => Vet, (vet) => vet.timeSlots)
//   vet: Vet;

//   @ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.reservationTime)
//   timeSlot: TimeSlot;

//   @OneToOne(() => Reservation, (reservation) => reservation.reservationTime)
//   reservation: Reservation;
// }
