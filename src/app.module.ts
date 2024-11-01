import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EstudiantesModule } from './estudiantes/estudiantes.module';

@Module({
  imports: [ConfigModule.forRoot(), EstudiantesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
