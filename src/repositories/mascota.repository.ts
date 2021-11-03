import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Veterinaria} from '../models';
import {VeterinariaRepository} from './veterinaria.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly veterinarias: HasManyRepositoryFactory<Veterinaria, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VeterinariaRepository') protected veterinariaRepositoryGetter: Getter<VeterinariaRepository>,
  ) {
    super(Mascota, dataSource);
    this.veterinarias = this.createHasManyRepositoryFactoryFor('veterinarias', veterinariaRepositoryGetter,);
    this.registerInclusionResolver('veterinarias', this.veterinarias.inclusionResolver);
  }
}
