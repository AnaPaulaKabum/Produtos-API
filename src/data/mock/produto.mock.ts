import { Sequelize } from "sequelize-typescript";
import { ProdutoDto } from "../../shared/ProdutoDto";
import { ProdutoEntity } from "../../core/domain/entites/produto.entity";

const sequelize = new Sequelize({ validateOnly: true });
sequelize.addModels([ProdutoEntity]);

export const produtosLista: Array<ProdutoDto> =[
    new ProdutoDto(1, "LV001","Livro C#", 15.90,100),
    new ProdutoDto(2, "LV002", "Livro Python", 25.90,100),
    new ProdutoDto(3, "LV003", "Livro PHP", 35.90,100),
    new ProdutoDto(4, "LV004", "Livro JavaScript", 40,100)
  ]
  
  export const produtoNovo     = new ProdutoDto(null,"LV005", "Novo Produto", 99.90, 100);
  export const produtoAlterar  = new ProdutoDto(2,"LV006", "Alterar Produto",99.90,100);
  export const produtoApagar   = new ProdutoDto(4,"LV007", "Apagar Produto", 99.90,100);
