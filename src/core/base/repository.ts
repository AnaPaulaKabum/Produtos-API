export abstract class Repository<T>{

    abstract criar(data: T): Promise<T>;
    abstract alterar(data: T): Promise<T>;
    abstract obterUm(id: number): Promise<T>;
    abstract obterTodos(): Promise<T[]>;
    abstract apagar(id: number): Promise<void>;
}