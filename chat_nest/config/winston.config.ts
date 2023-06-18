import { WinstonModule } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { DateTime } from 'luxon';
// require('winston-daily-rotate-file');

const dateNow = DateTime.now().setZone('Asia/Seoul');

export const winstonSetting = {
  logger: WinstonModule.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: `${dateNow.toFormat('yyyy-MM-dd HH:mm:ss')}`,
      }),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console({
        level: process.env.REACT_APP_ENV_MODE === 'REL' ? 'info' : 'silly',
        format: winston.format.combine(
          winston.format.timestamp({
            format: `${dateNow.toFormat('yyyy-MM-dd HH:mm:ss')}`,
          }),
          winston.format.json(),
          winston.format.colorize({ all: true }),
          winston.format.align(),
          nestWinstonModuleUtilities.format.nestLike('CHAT', {
            prettyPrint: true,
          }),
        ),
      }),
      new (require('winston-daily-rotate-file'))({
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.printf((verbose) => {
            return `[${verbose.timestamp}] ${process.env.REACT_APP_ENV_MODE}.${verbose.level}: ${verbose.message}`;
          }),
        ),
        filename: 'responder-logs/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
      // new winston.transports.File({
      //   filename: "./log/error.log",
      //   level: "error",
      // }),
      // new winston.transports.File({
      //   filename: "./log/wired.log",
      //   level: "verbose",
      // }),
      // new winston.transports.File({
      //   filename: "./log/info.log",
      //   level: "info",
      // }),
      // new winston.transports.File({ filename: "./log/combined.log" }),
    ],
  }),
};
