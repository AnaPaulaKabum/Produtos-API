
import { Repository } from "../base/repository";
import { ProdutoEntity } from "../domain/entites/produto.model";

export abstract class ProdutoRepository extends Repository<ProdutoEntity>{ }