import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{

    public url : string;


    constructor(private _http : HttpClient){
        this.url = GLOBAL.url;
    }

    addArtist(artist : Artist, token) : Observable<any>{
        console.log(artist);
        let headers = new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization', token);
        let params = JSON.stringify(artist);
        return this._http.post(this.url + 'artist', params, {headers : headers});
    }
} 