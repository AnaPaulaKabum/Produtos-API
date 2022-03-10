import { ProdutoEntity } from './remote/entity/produto.entity';
import { ProdutoRepository } from './remote/repository/produtoRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { createConnection } from 'typeorm';

const entities =  __dirname + '/../**/*.entity{.ts,.js}';
const repositorys = [ProdutoRepository];

export  const configConexao = [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => await createConnection({
        type: 'mysql',
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        entities: [entities],
        synchronize: true,
      }),
    },

   /* TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [...entities] ,
      synchronize: true,
    }),*/
    //TypeOrmModule.forFeature([...repositorys]),
]