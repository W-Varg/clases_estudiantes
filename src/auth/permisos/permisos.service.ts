import { Injectable } from '@nestjs/common';
import { permisosArray } from './permisos.array';

@Injectable()
export class PermisosService {
  findAll() {
    return permisosArray;
  }

  findOne(nombre: string) {
    return permisosArray.find((permiso) => permiso === nombre);
  }
}
