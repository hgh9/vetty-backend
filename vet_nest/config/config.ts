import { Reservation } from './../src/reservations/entity/reservation.entity';
import { Pet } from '../src/pets/entity/pet.entity';
import { Vet } from '../src/vets/entity/vet.entity';
import { User } from '../src/users/entity/users.entity';
import { TimeSlot } from '../src/vets/entity/timeslot.entity';
import * as dotenv from 'dotenv';
import { TreatmentResult } from '@/diagnosis/entity/TreatmentResult.entity';
import { Payment } from '../src/payments/entity/payments.entity';
dotenv.config({ path: './../.env' });

export default () => ({
  MODE: process.env.REACT_APP_ENV,
  DB: {
    type: process.env.DB_TYPE === 'mariadb' ? 'mariadb' : 'mysql',
    host:
      process.env.REACT_APP_ENV === 'local'
        ? '127.0.0.1'
        : process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    timezone: '+00:00',
    // entities: ['dist/**/*.entity.js'],
    // logging: Boolean(JSON.parse(process.env.DB_LOGGING)),
    logging: true,
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
    entities: [User, Pet, Vet, TimeSlot, Reservation, Payment, TreatmentResult],
  },

  NEST: {
    PORT: process.env.REACT_APP_NEST_LOCAL_PORT,
    HOST:
      process.env.REACT_APP_ENV === 'local'
        ? 'localhost'
        : process.env.REACT_APP_NEST_HOSTNAME,
  },
  REACT: {
    PORT: process.env.REACT_LOCAL_PORT,
  },
  REDIS: {
    PORT: process.env.REACT_APP_REDIS_LOCAL_PORT,
    HOST:
      process.env.REACT_APP_ENV === 'local'
        ? 'localhost'
        : process.env.REACT_APP_REDIS_HOSTNAME,
  },
  AZURE: {
    AZURE_INSTRUMENT_KEY: process.env.AZURE_INSTRUMENT_KEY,
  },
});
