import { Module } from '@nestjs/common';
import { ProdutosController } from './application/controller/produtos.controller';
import { configConexao } from './database/configConexao';
import { ProdutosServices } from './services/produtos.service';
import { ConfigModule } from '@nestjs/config';
import { ProdutoRepository } from './database/remote/repository/produtoRepository';
import { photoProviders } from './database/remote/providers/produto.provider';

@Module({
  imports : [ConfigModule.forRoot()],
  controllers: [ProdutosController],
  providers:   [...configConexao,...photoProviders,ProdutoRepository,ProdutosServices],
})
export class AppModule {}