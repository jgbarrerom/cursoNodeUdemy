import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map, catchError, mapTo, retry } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { GLOBAL } from './global'
import { User } from '../models/user';


@Injectable()
export class UserService{
    private identity;
    private token;
    public url: string;
    
    constructor(private _http : HttpClient){
        this.url = GLOBAL.url;
    }

    signup(user_to_login, gethash = ''){
        user_to_login.gethash = gethash;
        const body = new HttpParams()
            .set('email',user_to_login.email)
            .set('password',user_to_login.password)
            .set('gethash',user_to_login.gethash);
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.post(this.url+'login', body, {headers : headers});
    }

    register(user_to_register : User): Observable<any>{ 
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify(user_to_register);
        return this._http.post(this.url+'register',body,{headers: headers});
    }

    updateUser(user_to_update : User) : Observable<any>{
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        const params = JSON.stringify(user_to_update);
        return this._http.put(this.url+'update-user/'+user_to_update._id, params, {headers: headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }


}