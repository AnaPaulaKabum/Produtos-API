import { Module } from '@nestjs/common';
import { ProdutosController } from './application/controller/produtos.controller';
import { ProdutosServices } from './services/produtos.service';
import { ProdutoEntity } from './database/remote/entity/produto.entity';
import { ProdutoRepository } from './database/remote/repository/produtoRepository';
import { ProdutoMapper } from './database/remote/mappear/produtoMappear';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({

  //Configuração para repositoryCacheMemory
  /*
    imports: [],
    controllers: [ProdutosController],
    providers: [{
      provide: ProdutoRepositoryCacheMemory,
      useClass: ProdutoRepositoryCacheMemory
    },
    ProdutosServices],
})*/

// Configuração para banco de dados:

imports: [
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [ProdutoEntity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([ProdutoRepository]),
],
  controllers: [ProdutosController],
  providers:   [ProdutosServices,ProdutoMapper],
})
export class AppModule {}