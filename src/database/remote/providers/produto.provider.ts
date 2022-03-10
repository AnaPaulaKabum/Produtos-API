import { Connection } from 'typeorm';
import { ProdutoEntity } from '../entity/produto.entity';

export const photoProviders = [
  {
    provide: 'PRODUTO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ProdutoEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];