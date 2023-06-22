import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entity/reservations.entity';

@Controller('reservations')
export class ReservationsController {}
