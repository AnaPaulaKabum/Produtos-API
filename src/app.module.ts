import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutosController } from './application/produtos.controller';
import { ProdutosServices } from './services/produtos.service';
import { ProdutoEntity } from './core/domain/entites/produto.model';
import { ProdutoRepository } from './core/repositories/produto.repository';
import { ProdutoRepositoryCacheMemory } from './data/cache-memory/produtoRepository-cache-memory';

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
    provide: ProdutoRepository,
    useClass: ProdutoRepositoryCacheMemory
  },
  ProdutosServices],
})
export class AppModule {}
