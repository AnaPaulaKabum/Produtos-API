import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutosController } from './application/controller/produtos.controller';
import { ProdutosServices } from './services/produtos.service';
import { ProdutoEntity } from './database/remote/entity/produto.entity';
import { ProdutoRepository } from './database/remote/repository/produtoRepository';
import { ProdutoMapper } from './database/remote/mappear/produtoMappear';

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
    SequelizeModule.forRoot({
      dialect:'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      autoLoadModels:true,
      synchronize: true,

    }),
    SequelizeModule.forFeature([ProdutoEntity])
  ],
  controllers: [ProdutosController],
  providers:   [ProdutosServices,ProdutoRepository,ProdutoMapper],
})
export class AppModule {}
