import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Entity } from "src/core/base/entity";
import { Repository } from "src/core/base/repository";

@Injectable()
export class RepositoryRemote<T extends Entity> extends Repository<T>{

    
    criar(data: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    alterar(data: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    obterUm(id: number): Promise<T> {
        throw new Error("Method not implemented.");
    }
    obterTodos(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    apagar(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }


    /*constructor(
        @InjectModel(T)
        private repository : typeof T)
    {
        super();
    }

    async obterTodos():Promise<T[]>{

        return  this.repository.findAll();
    }

    async obterUm(id:number):Promise<T>{

        return this.repository.findByPk(id);
    }

    async criar(produto: T):Promise<T>{

        return this.repository.create(produto);        
    }

    async alterar(item: T): Promise<T>{

        const resultado = await this.repository.update(item,{
                        where: {
                                id: item.id
                               } 
        });

        if (resultado[0] > 0){ 
            return resultado[1][0];
        }

        return await this.criar(item);
    }

    async apagar(item:T): Promise<void>{

            this.repository.destroy({where: { id: item.id } });
     }*/
}
