import { Injectable, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global'


@Injectable()
export class UserService{
    public url: string;
    
    constructor(private _http : HttpClientModule){
        this.url = GLOBAL.url;
    }

    signup(){
        return 'HOLA MUNDO DESDE SERVICIO';
    }


}