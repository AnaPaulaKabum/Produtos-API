import { Module } from '@nestjs/common';
import { ProdutosController } from './application/controller/produtos.controller';
import { configConexao } from './database/configConexao';
import { ProdutosServices } from './services/produtos.service';


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

  imports: [ ...configConexao],
  controllers: [ProdutosController],
  providers:   [ProdutosServices],
})
export class AppModule {}