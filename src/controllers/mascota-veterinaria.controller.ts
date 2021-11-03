import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  Veterinaria,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaVeterinariaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/veterinarias', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Veterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Veterinaria>,
  ): Promise<Veterinaria[]> {
    return this.mascotaRepository.veterinarias(id).find(filter);
  }

  @post('/mascotas/{id}/veterinarias', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Veterinaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinaria, {
            title: 'NewVeterinariaInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) veterinaria: Omit<Veterinaria, 'id'>,
  ): Promise<Veterinaria> {
    return this.mascotaRepository.veterinarias(id).create(veterinaria);
  }

  @patch('/mascotas/{id}/veterinarias', {
    responses: {
      '200': {
        description: 'Mascota.Veterinaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinaria, {partial: true}),
        },
      },
    })
    veterinaria: Partial<Veterinaria>,
    @param.query.object('where', getWhereSchemaFor(Veterinaria)) where?: Where<Veterinaria>,
  ): Promise<Count> {
    return this.mascotaRepository.veterinarias(id).patch(veterinaria, where);
  }

  @del('/mascotas/{id}/veterinarias', {
    responses: {
      '200': {
        description: 'Mascota.Veterinaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Veterinaria)) where?: Where<Veterinaria>,
  ): Promise<Count> {
    return this.mascotaRepository.veterinarias(id).delete(where);
  }
}
