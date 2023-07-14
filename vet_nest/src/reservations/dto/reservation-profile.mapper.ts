import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, MappingConfiguration, type Mapper, extend } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Reservation } from '../entity/reservation.entity';
import { ReservastionsDto } from './reservations.dto';

@Injectable()
export class ReservationMapperProfile extends AutomapperProfile {
  
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Reservation, ReservastionsDto);
    }
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    // the 3 createMap() above will get this `extend()`
    return [extend(Reservation, ReservastionsDto)];
}
}