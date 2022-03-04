import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorHttp {


    static recursoCadastrado(recurso:string, id:number){

        return new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: `${recurso} encontra-se no sistema com o id ${id}`,
          }, HttpStatus.BAD_REQUEST);
    }


}