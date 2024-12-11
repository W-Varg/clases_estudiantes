import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MateriasModule } from './materias/materias.module';
import { AsistenciasModule } from './asistencias/asistencias.module';
import { ReportModule } from './report/report.module';
import { AutenticacionModule } from './auth/autenticacion.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, // lee desde  .env
    }),
    EstudiantesModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    MateriasModule,
    AsistenciasModule,
    ReportModule,
    AutenticacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
