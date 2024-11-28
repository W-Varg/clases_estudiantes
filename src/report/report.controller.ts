import { Controller, Post } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('estudiantes/edad')
  create() {
    return this.reportService.estudiantePorEdad();
  }
}
