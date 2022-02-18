import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutosController } from './application/controller/produtos.controller';
import { ProdutosServices } from './services/produtos.service';
import { ProdutoEntity } from './core/domain/entites/produto.model';
import { ProdutoRepositoryCacheMemory } from './data/cache-memory/produtoRepository-cache-memory';
import { ProdutoRepository } from './data/remote/produto-repository';

@Module({
  imports: [
    /*ConfigModule.forRoot(),
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
    SequelizeModule.forFeature([ProdutoEntity])*/
  ],
  controllers: [ProdutosController],
  providers: [{
    provide: ProdutoRepositoryCacheMemory,
    useClass: ProdutoRepositoryCacheMemory
  },
  ProdutosServices],
})
export class AppModule {}
