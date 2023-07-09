import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { DateTime } from 'luxon';

const dateNow = DateTime.now().setZone('Asia/Seoul');

export async function swaggerSetting(app) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('VETTY API')
    .setDescription(
      `
        마지막 업데이트 : ${dateNow.toFormat('yyyy-MM-dd HH:mm:ss')}
        `,
    )
    .setContact('Steve', 'https://diasm3.github.com', 'diasm2@gmail.com')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: '항해플러스 1기 9조 동물병원',
  };
  SwaggerModule.setup('/swagger', app, document, customOptions);
}
