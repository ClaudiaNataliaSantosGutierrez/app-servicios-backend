import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Veterinaria, VeterinariaRelations, Mascota, Servicio} from '../models';
import {MascotaRepository} from './mascota.repository';
import {ServicioRepository} from './servicio.repository';

export class VeterinariaRepository extends DefaultCrudRepository<
  Veterinaria,
  typeof Veterinaria.prototype.id,
  VeterinariaRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof Veterinaria.prototype.id>;

  public readonly servicio: HasOneRepositoryFactory<Servicio, typeof Veterinaria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Veterinaria, dataSource);
    this.servicio = this.createHasOneRepositoryFactoryFor('servicio', servicioRepositoryGetter);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
