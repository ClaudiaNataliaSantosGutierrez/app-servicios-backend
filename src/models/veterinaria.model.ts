import {belongsTo, Entity, model, property, hasOne} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Servicio} from './servicio.model';

@model()
export class Veterinaria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreVeterinaria: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreEncargado: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  id_servicio: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @hasOne(() => Servicio)
  servicio: Servicio;

  constructor(data?: Partial<Veterinaria>) {
    super(data);
  }
}

export interface VeterinariaRelations {
  // describe navigational properties here
}

export type VeterinariaWithRelations = Veterinaria & VeterinariaRelations;
