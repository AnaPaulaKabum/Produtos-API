import { ProdutoEntity } from './remote/entity/produto.entity';
import { ProdutoRepository } from './remote/repository/produtoRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

const entities = [ProdutoEntity];
const repositorys = [ProdutoRepository];

export  const configConexao = [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [...entities] ,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([...repositorys]),
]