import { Sequelize } from "sequelize-typescript";
import { ProdutoEntity } from "../../core/domain/entites/produto.entity";

const sequelize = new Sequelize({ validateOnly: true });
sequelize.addModels([ProdutoEntity]);

export const produtosLista: Array<ProdutoEntity> =[
    new ProdutoEntity({codigo: "LV001", nome: "Livro C#", preco:15.90,qtde:100}),
    new ProdutoEntity({codigo: "LV002", nome: "Livro Python", preco:25.90,qtde:100}),
    new ProdutoEntity({codigo: "LV003", nome: "Livro PHP", preco:35.90,qtde:100}),
    new ProdutoEntity({codigo: "LV004", nome: "Livro JavaScript", preco:40,qtde:100})
  ]
  
  export const produtoNovo  = new ProdutoEntity({codigo: "LV005", nome: "Novo Produto", preco:99.90, qtde: 100});
  export const produtoAlterar  = new ProdutoEntity({codigo: "LV006", nome: "Alterar Produto", preco:99.90,qtde: 100});
  export const produtoApagar  = new ProdutoEntity({codigo: "LV007", nome: "Apagar Produto", preco:99.90,qtde: 100});
