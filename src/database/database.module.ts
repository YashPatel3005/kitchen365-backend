import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from 'src/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: DATABASE_CONFIG,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
