import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Veterinaria,
  Mascota,
} from '../models';
import {VeterinariaRepository} from '../repositories';

export class VeterinariaMascotaController {
  constructor(
    @repository(VeterinariaRepository)
    public veterinariaRepository: VeterinariaRepository,
  ) { }

  @get('/veterinarias/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Veterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Veterinaria.prototype.id,
  ): Promise<Mascota> {
    return this.veterinariaRepository.mascota(id);
  }
}
