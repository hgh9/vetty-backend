import { Logger } from '@nestjs/common';
import config from '../../../config/config';

export const currentModeProviders = {
  provide: 'CurrentMode',
  useFactory: async () => {
    const logger = new Logger();

    logger.verbose(`
  *********************************************************************
  *                                                                   
  *                  Currently '${config().MODE}' MODE                 
  *                                                                   
  *********************************************************************
  `);
  },
};
