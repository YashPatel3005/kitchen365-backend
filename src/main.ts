import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './pipes/custom-validation-pipe';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  const nodeEnv = process.env.NODE_ENV || 'development';

  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port, () => {
    console.log(
      `[INFO] Application is running on port ${port} in ${nodeEnv} mode.`,
    );
  });

  app.enableShutdownHooks();
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
});
