import { Logger } from '@nestjs/common';
import config from '../../../config/config';
import { ConfigService } from '@nestjs/config';
import { setTimeout } from 'timers';

export const currentModeProviders = {
  provide: 'CurrentMode',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger();

    setTimeout(() => {
      logger.verbose(
        `
  *********************************************************************
  *                                                                   
  *                  Currently '${config().MODE}' MODE                 
  *                  connect DB to '${config().DB.host}'
  *                                                                   
  *********************************************************************
  `,
      );
    }, 200);
  },
};
