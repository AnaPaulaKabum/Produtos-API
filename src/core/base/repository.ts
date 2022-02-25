export interface Repository<T>{

     criar(data: T): Promise<T>;
     alterar(data: T): Promise<T>;
     obterUm(id: number): Promise<T>;
     obterTodos(): Promise<T[]>;
     apagar(id: number): Promise<void>;
}