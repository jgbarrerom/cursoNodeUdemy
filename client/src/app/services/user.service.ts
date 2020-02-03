import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global'
import { User } from '../models/user';


@Injectable()
export class UserService{
    public url: string;
    
    constructor(private _http : HttpClient){
        this.url = GLOBAL.url;
    }

    signup(user_to_login, gethash = null){
        if(gethash != null){
            user_to_login.gethash = gethash;
        }
        console.log('GET OBJECT USER ' + JSON.stringify(user_to_login));
        const body = new HttpParams()
            .set('email',user_to_login.email)
            .set('password',user_to_login.password)
            .set('gethash',user_to_login.gethash);
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.post(this.url+'login', body, {headers : headers})
        .pipe(
            map(response => {
                console.log('RTA ' + response);
            })
        );
    }


}