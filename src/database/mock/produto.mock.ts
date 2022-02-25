import { Sequelize } from "sequelize-typescript";
import { ProdutoDto } from "../../shared/ProdutoDto";
import { ProdutoEntity } from "../remote/entity/produto.entity";

//const sequelize = new Sequelize({ validateOnly: true });
//sequelize.addModels([ProdutoEntity]);

export const produtosLista: Array<ProdutoDto> =[
    { id:1, codigo:"LV001", nome: "Livro C#", preco: 15.90, qtde:100} as ProdutoDto ,
    { id:2, codigo:"LV002", nome: "Livro Python", preco: 25.90, qtde:100} as ProdutoDto ,
    { id:3, codigo:"LV003", nome: "Livro PHP", preco: 35.90, qtde:100} as ProdutoDto ,
    { id:4, codigo:"LV004", nome: "Livro JavaScript", preco: 40, qtde:100} as ProdutoDto 
  ]
  
  export const produtoNovo     =  {codigo:"LV005", nome: "Novo Produto", preco: 99.90, qtde:100} as ProdutoDto ;
  export const produtoAlterar  =  {codigo:"LV006", nome: "Alterar Produto", preco: 99.90, qtde:100} as ProdutoDto ;
  export const produtoApagar   =  {codigo:"LV007", nome: "Apagar Produto", preco: 99.90, qtde:100} as ProdutoDto ;

