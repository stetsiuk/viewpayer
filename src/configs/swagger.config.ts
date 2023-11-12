import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Viewpayer')
    .setDescription('The Viewpayer API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { docExpansion: 'none', tagsSorter: 'alpha' },
  });
};
