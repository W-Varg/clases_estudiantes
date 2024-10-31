export enum SexoEnum {
  Femenino = 'F',
  Masculino = 'M',
  Otros = 'O',
}

export class EstudianteModel {
  carnetIdentidad: string;
  nombre: string;
  segundoNombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  fechaNacimiento: Date;
  sexo: SexoEnum; //  masculino o femenino pero no valores asi: hombre, varon, macho, etc.

  email: string;
  direccion: string;
  nroCelular: number;
  tieneWhatsapp: boolean;
  rutaFoto?: string;
  estado: boolean;
}
