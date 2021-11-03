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
  Veterinaria,
  Servicio,
} from '../models';
import {VeterinariaRepository} from '../repositories';

export class VeterinariaServicioController {
  constructor(
    @repository(VeterinariaRepository) protected veterinariaRepository: VeterinariaRepository,
  ) { }

  @get('/veterinarias/{id}/servicio', {
    responses: {
      '200': {
        description: 'Veterinaria has one Servicio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Servicio),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio> {
    return this.veterinariaRepository.servicio(id).get(filter);
  }

  @post('/veterinarias/{id}/servicio', {
    responses: {
      '200': {
        description: 'Veterinaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinaria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInVeterinaria',
            exclude: ['id'],
            optional: ['veterinariaId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.veterinariaRepository.servicio(id).create(servicio);
  }

  @patch('/veterinarias/{id}/servicio', {
    responses: {
      '200': {
        description: 'Veterinaria.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.veterinariaRepository.servicio(id).patch(servicio, where);
  }

  @del('/veterinarias/{id}/servicio', {
    responses: {
      '200': {
        description: 'Veterinaria.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.veterinariaRepository.servicio(id).delete(where);
  }
}
