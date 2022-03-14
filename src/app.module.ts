import { Module } from '@nestjs/common';
import { ProdutosController } from './application/controller/produtos.controller';
import { configConexao } from './database/configConexao';
import { ConfigModule } from '@nestjs/config';
import { produtoProviders } from './database/remote/providers/produto.provider';

@Module({
  imports : [ConfigModule.forRoot()],
  controllers: [ProdutosController],
  providers:   [...configConexao,...produtoProviders],
})
export class AppModule {}