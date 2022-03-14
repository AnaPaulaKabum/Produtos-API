import { Connection } from 'typeorm';
import { ProdutoEntity } from '../entity/produto.entity';
import { ProdutosServices } from '../../../services/produtos.service';
import { ProdutoRepository } from '../../../database/remote/repository/produtoRepository';

export const produtoProviders = [
  {
    provide: 'PRODUTO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ProdutoEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  ProdutoRepository,
  ProdutosServices
];